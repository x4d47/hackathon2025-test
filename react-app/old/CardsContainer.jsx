import InfoCard from './InfolCard.jsx'

function CardsContainer(props) {
    return(
        <>
            <div class="text-center w-full">
                <h1 class="text-left font-bold">{props.Lable}</h1>
                <div class="flex flex-row flex-wrap justify-start
                             min-w-fit h-[310px] overflow-auto">
                {
                    props.Array.map((card, index) => 
                    <InfoCard key={index} 
                              Image={card.Image} Name={card.Name} 
                              Describtion={card.Describtion} Location={card.Location}/>)
                }
                </div>
                <button>
                    See more
                </button>
            </div>
        </>
    );
}

export default CardsContainer