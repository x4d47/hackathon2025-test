import InfoCard from './Cards/InfolCard.jsx'

function CardsContainer(props) {
    return(
        <>
            <div class="text-center w-full">
                <h1 class="text-left font-bold">{props.Lable}</h1>
                <div class="flex flex-row flex-wrap justify-start
                             min-w-fit h-[310px] overflow-auto">
                    <InfoCard/>
                </div>
                <button>
                    See more
                </button>
            </div>
        </>
    );
}

export default CardsContainer