//const API='https://youtube-v31.p.rapidapi.com/search?channelId=UCnwiCpx9iPgV6RtIo3WtumQ&part=snippet%2Cid&order=date&maxResults=50';
const API='https://youtube-v31.p.rapidapi.com/search?channelId=UCnwiCpx9iPgV6RtIo3WtumQ&part=snippet%2Cid&order=date&maxResults=50';

const content = null || document.getElementById('content');
let cargando = null || document.getElementById('cargando');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'be5078d425msh3928251dabe3378p1999c4jsn2df257fd8e0a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
	const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

async function obtenerVideos(){
	try{
		const videos = await fetchData(API);
		let view = `${videos.items.map(video=> `
                <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <!-- <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full"> -->
					<iframe src="https://www.youtube.com/embed/${video.id.videoId}" class="w-full"></iframe>
                </div>
                <div class="mt-4 flex justify-between">					
                    <h3 class="text-sm">					
					<a href="https://www.youtube.com/watch?v=${video.id.videoId}" style="color:blue" target="_blank">
                    ${video.snippet.title}</a>
                    </h3>
                </div>
                </div>
		    `).join('')}`;
        content.innerHTML = view;
		cargando.innerText="";
	}catch (error){
        console.log(error);
	}
}

function cargarVideos(){
	cargando.innerText="Cargando videos...";	
	content.innerHTML = '';
	setTimeout(() => {
		obtenerVideos();
	}, 3000);
}

/*FUNCION AUTOEJECUTABLE
(async ()=>{
	try{
		const videos = await fetchData(API);
		let view = `${videos.items.map(video=> `
                <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
                </div>
		    `).join('')}`;
        content.innerHTML = view;
	}catch (error){
        console.log(error);
	}
})();*/

/*Para ejecutarlo con promesas
fetch(API, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));*/