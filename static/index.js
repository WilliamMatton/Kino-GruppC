async function fetchJson(url){
	const res= await fetch(url)
	if(!res.ok) throw new Error('network')
	return res.json()
}

function daysAgoDate(days){
	const d=new Date()
	d.setDate(d.getDate()-days)
	return d
}

async function getRecentRatings(id,days){
	const cutoff=daysAgoDate(days)
	const ratings=[]
	let page=1
	while(true){
		const json=await fetchJson(`/reviews/${id}?page=${page}`)
		const data=Array.isArray(json?.data)?json.data:[]
		if(data.length===0) break
		let olderCount=0
		for(const r of data){
			const val=r?.attributes?.rating
			const created=r?.attributes?.createdAt||r?.attributes?.updatedAt
			const when=created?new Date(created):null
			if(when && when>=cutoff){
				if(typeof val==='number') ratings.push(val)
			} else {
				olderCount++
			}
		}
		const meta=json?.meta?.pagination
		if(!meta||page>=meta.pageCount) break
		if(olderCount===data.length) break
		page++
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
	const cached=loadCache('popularTop30')
	if(cached&&Array.isArray(cached)) {renderTop(cached.slice(0,5)); return}
	const movies=await fetchJson('/movies')
	const list=Array.isArray(movies)?movies:[]
	const withRatings=await limitConcurrency(list,4,async m=>{
		const ratings=await getRecentRatings(m.id,30)
		return {movie:m,avg:average(ratings),count:ratings.length}
	})
	const filtered=withRatings.filter(x=>x.count>0)
	filtered.sort((a,b)=>b.avg-a.avg)
	const top=filtered.slice(0,5)
	saveCache('popularTop30',top,10*60*1000)
	renderTop(top)
}

document.addEventListener('DOMContentLoaded',loadPopular)

