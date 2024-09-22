

const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');

let ticketPrice= +movieSelect.value;

populateUI();

function setMoviedata(movieIndex,moviePrice){
    localStorage.setItem('selectMovieIndex',movieIndex);
    localStorage.setItem('selectMoviePrice',moviePrice);

}

function updateSelectedCount(){
 const selectedSeats=document.querySelectorAll('.row .seat.selected');

 const indexSeat=[...selectedSeats].map(function(seat){
       return [...seats].indexOf(seat);
 });
 localStorage.setItem('selectedSeats',JSON.stringify(indexSeat));
 
 const selectedSeatsCount = selectedSeats.length;
 
 count.innerText=selectedSeatsCount;
 total.innerText=selectedSeatsCount*ticketPrice;
}


function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats!==null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
        if(selectedSeats.indexOf(index)>-1){
            seat.classList.add('selected');
        }

        });
    }

    const selectMovieIndex=localStorage.getItem('selectMovieIndex');
     
    if(selectMovieIndex!==null){
        movieSelect.selectedIndex=selectMovieIndex;
    }
    
}
movieSelect.addEventListener('change',e => {
    ticketPrice = +e.target.value;
    setMoviedata(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});


updateSelectedCount();