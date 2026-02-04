async function fetchJson(url){
	const res= await fetch(url)
	if(!res.ok) throw new Error('network')
	return res.json()
}

async function getRatingsFirstPage(id){
	const json=await fetchJson(`/reviews/${id}?page=1`)
	const data=Array.isArray(json?.data)?json.data:[]
	const ratings=[]
	for(const r of data){
		const val=r?.attributes?.rating
		if(typeof val==='number') ratings.push(val)
	}
	return ratings
}

function average(arr){
	if(!arr.length) return 0
	let s=0
	for(const n of arr) s+=n
	return s/arr.length
}

function renderTop(top){
	const ids=['popularMovie1','popularMovie2','popularMovie3','popularMovie4','popularMovie5']
	for(let i=0;i<ids.length;i++){
		const el=document.getElementById(ids[i])
		if(!el) continue
		
        const item=top[i]
		if(!item) { el.innerHTML=''; continue }
		
        const attrs = item.movie?.attributes||{}
		const imageUrl=attrs.image?.url||''
		
        const title=attrs.title||''
		el.innerHTML=''
		
        const link = document.createElement('a')
		link.href =`/movieIntro.html?id=${item.movie.id}`
		link.className ='movieLink'

		const img = document.createElement('img')
		img.src =imageUrl
		img.alt =title
		img.loading='lazy'
		img.className ='imageCard'

		const info = document.createElement('div')
		info.className='container'

		const h3= document.createElement('h3')
		h3.className='cardTitle'
		h3.textContent=title

		const p= document.createElement('p')
		p.className='cardRating'
		p.textContent=`${item.avg.toFixed(1)} / 5`
		info.appendChild(h3)
		info.appendChild(p)
		link.appendChild(img)
		link.appendChild(info)
		el.appendChild(link)
	}
}

function limitConcurrency(items,limit,worker){
	const results=[]
	let idx=0
	return new Promise(resolve=>{
		let active=0
		function run(){
			while(active<limit && idx<items.length){
				const i=idx++
				active++
				Promise.resolve(worker(items[i]))
					.then(r=>{results[i]=r})
					.finally(()=>{active--; if(idx>=items.length && active===0) resolve(results); else run()})
			}
		}
		run()
	})
}

function saveCache(key,value,ttlMs){
	const entry={v:value,t:Date.now(),ttl:ttlMs}
	try{localStorage.setItem(key,JSON.stringify(entry))}catch{}
}

function loadCache(key){
	try{
		const raw=localStorage.getItem(key)
		if(!raw) return null
		const entry=JSON.parse(raw)
		if(!entry||typeof entry!=='object') return null
		if(Date.now()-entry.t>entry.ttl) return null
		return entry.v
	}catch{return null}
}

async function loadPopular(){
	const cached=loadCache('popularTop')
	if(cached&&Array.isArray(cached)) {renderTop(cached.slice(0,5)); return}
	const movies=await fetchJson('/movies')
	const list=Array.isArray(movies)?movies:[]
	const withRatings=await limitConcurrency(list,4,async m=>{
		const ratings=await getRatingsFirstPage(m.id)
		return {movie:m,avg:average(ratings)}
	})
	withRatings.sort((a,b)=>b.avg-a.avg)
	const top=withRatings.slice(0,5)
	saveCache('popularTop',top,10*60*1000)
	renderTop(top)
}

document.addEventListener('DOMContentLoaded',loadPopular)

