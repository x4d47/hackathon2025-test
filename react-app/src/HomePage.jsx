import InfoCard from './InfolCard'

function HomePage(){
    return(
        <>
            <div class="flex flex-row flex-nowrap w-full h-auto">
                <div class="flex flex-col min-w-fit shrink-0">
                    <button class="relative bg-transparent
                                border-1 border-black rounded-full
                                text-center">
                                    Switch
                        <div class="absolute left-0 top-0 
                                    w-1/2 h-full
                                    border-1 border-black rounded-full
                                    bg-black">
                        </div>
                    </button>
                    <div class="border-1 border-black w-[250px] text-center">
                        <p>Filters</p>

                    </div>
                </div>
                <div class="flex flex-col shrink-1">
                    <div class="border-1 border-black rounded-full pl-2 pr-2">
                        SearchBar
                    </div>
                    <div class="flex flex-row flex-wrap 
                                ">
                        <InfoCard/>
                        <InfoCard/>
                        <InfoCard/>
                        <InfoCard/>
                        <InfoCard/>
                        <InfoCard/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage