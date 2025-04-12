function AnimalCard(props) {
    return(
        <>
        <div class="min-w-[250px] min-h-[300px] bg-white border-black border-2 m-1 text-center">            
            <div class="relative w-full h-full">
                <p class="absolute top-0 left-0 z-1">TOP</p>
                <button class="absolute top-0 right-0 z-1">Like</button>
                <a class="relative block w-full h-2/3" href=""></a>
                <a class="relative" href="">Name</a>
                <p class="relative">Short Desc</p>
                <p class="relative">Location</p>
            </div>
        </div>
        </>
    );
}

export default AnimalCard