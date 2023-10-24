
import {Component} from "react"
import "./index.css"


class SeatsLayout extends Component{

    toggleSeat = (event)=>{
        const {index} = event.target.value
        console.log(index)
    }

     GenerateSeats = (seatNumbers) => {
        return (
            <div className=" movie-layout-1">
                {seatNumbers.map((seatNumber , index) =><button type="button" key={index+seatNumber+index} className="seat" value={index + seatNumber + index} onChange={this.toggleSeat}>{seatNumber} </button> )}
            </div>
        )
    }

    seats = () =>{
        
        return (
            <div className="movie-complex">
                <img className="image1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQcjhvySwo_U7KjpBleH-dSO14Q8Dq0hDjw&usqp=CAU" alt="1"/>
                <div className=" movie-layout">
                    <div className="movie-column-1">
                        {this.GenerateSeats(Array(0).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(1))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        
                    </div>
                    <div className="movie-column-2">
                        {this.GenerateSeats(Array(0).fill(0))}
                        {this.GenerateSeats(Array(0).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                    </div>
                    <div className="movie-column-3">
                        {this.GenerateSeats(Array(0).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                    </div> 
                </div>


                <div className=" movie-layout">
                    <div className="movie-column-1">
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        
                    </div>
                    <div className="movie-column-2">
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                        {this.GenerateSeats(Array(10).fill(0))}
                    </div>
                    <div className="movie-column-3">
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                        {this.GenerateSeats(Array(8).fill(0))}
                    </div> 
                </div>
            </div>
          );

    }

    render(){
        return (
            <div>
                {this.seats()}
            </div>
        )
    }
}

export default SeatsLayout
