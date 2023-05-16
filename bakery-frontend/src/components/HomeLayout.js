import { Card } from "./Card";
function HomeLayout(){
  
    const styleObj = {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
    }

    return(
        <div className="centerTrend">
        <div className="MealOfTheWeek">
        <h1>Meal of the week</h1>
        <h3>La poutine à Monique spicy.</h3>
        <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="375" height="300"></img>
        <div className="centerTrend">
            <h3 style={styleObj}>
        This week's meal is a mouth-watering poutine recipe that 
        will leave your taste buds begging for more. Made with the richest gravy,
         velvety cheese curds, and crispy potatoes, Monique's poutine is a delicious
          and hearty dish that is perfect for any occasion. Treat yourself to this divine creation and experience the magical flavors that have made it a beloved classic.
          </h3>
        </div>
        </div>  

        <div className="Trend">
        <div>
            <h1>Trending</h1>
        <div className="flex-container">
    
            <div className="child">
             
                    <div className="centerCard">
                        <div className="centerTitle">
                       <h5>Buffalo Chicken Wings</h5>
                       <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="150" height="100"></img>
                      <h5>type: Dinner</h5>
                    <h5>Number of serving: 2</h5>
                    <h5>By: Monique Gagnon</h5>
                        </div>
                    </div>
                    
            
            </div>  
            <div className="centerCard">
                        <div className="centerTitle">
                       <h5>Buffalo Chicken Wings</h5>
                       <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="150" height="100"></img>
                      <h5>type: Dinner</h5>
                    <h5>Number of serving: 2</h5>
                    <h5>By: Monique Gagnon</h5>
                        </div>
                    </div>
                    <div className="centerCard">
                        <div className="centerTitle">
                       <h5>Buffalo Chicken Wings</h5>
                       <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="150" height="100"></img>
                      <h5>type: Dinner</h5>
                    <h5>Number of serving: 2</h5>
                    <h5>By: Monique Gagnon</h5>
                        </div>
                    </div>
                    <div className="centerCard">
                        <div className="centerTitle">
                       <h5>Buffalo Chicken Wings</h5>
                       <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="150" height="100"></img>
                      <h5>type: Dinner</h5>
                    <h5>Number of serving: 2</h5>
                    <h5>By: Monique Gagnon</h5>
                        </div>
                    </div>
                    <div className="centerCard">
                        <div className="centerTitle">
                       <h5>Buffalo Chicken Wings</h5>
                       <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="150" height="100"></img>
                      <h5>type: Dinner</h5>
                    <h5>Number of serving: 2</h5>
                    <h5>By: Monique Gagnon</h5>
                        </div>
                    </div>
                    <div className="centerCard">
                        <div className="centerTitle">
                       <h5>Buffalo Chicken Wings</h5>
                       <img  src="https://i.imgur.com/h36LiZ9_d.webp?maxwidth=1520&fidelity=grand" alt="Girl in a jacket" width="150" height="100"></img>
                      <h5>type: Dinner</h5>
                    <h5>Number of serving: 2</h5>
                    <h5>By: Monique Gagnon</h5>
                        </div>
                    </div>
        </div>
        </div>
        </div>
        </div>  
        

        
    );
}

export {HomeLayout};