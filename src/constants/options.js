

export const SelectTravelesList =[

{
    id:"1",
    title:"Just Me",
    desc:"A sole traveles in exploration",
    icon:"/icons/travel.svg",
    people:"one"
},

{
    id:"2",
    title:"Couple",
    desc:"Two travelers in tandom",
    icon:"./icons/wedding.svg",
    people:"two people",
},


{
    id:"3",
    title:"Family",
    desc:"A group of fun loving adv",
    icon:"./icons/family-symbol.svg",
    people:"3 and 5 people"
},

]

export const SelectBudgetOptions=[

{
    id:"1",
    title:"Cheap",
    desc:"Stay conscious of costs",
    icon:"./icons/banknotes.svg",

},


{
    id:"2",
    title:"Moderate",
    desc:"Keep cost on the average side",
    icon:"./icons/money.svg",
   
},

{
    id:"3",
    title:"Luxury",
    desc:"Go all out",
    icon:"./icons/coin.svg",
},


]
// export const AIModel ='Generate Travel plan for {Location}: ,for  {totalDays}days For {traveler} with a  {budget} budget, Please provide a list of hotel options that includes
//  Hotel name
//  Hotel address
//  Price
//  Hotel image URL
//  Place URL (link to the hotel or booking page)
//  Geo-coordinates
//  Ticket pricing for attractions
//  Rating
//  Travel time for each location for 2 days
//  Each of the location for{totalDays}day's plan with the best time to visit

// Please return the information in JSON format. '


//  give me  hotels option list with Hotels name ,Hotels address,price,hotelsimage,Hotel image URLs , Place Image URLs geo coordinates,ticket Princing, rating ,Time travel each of the location for {totalDays} days with eachday plan with best time to visit in JSON format';
export const AIModel=`Generate Travel plan for {Location} for {totalDays} days for {traveler} with a {budget} budget. Please provide a list of hotel options that includes
- Hotel name
- Hotel address
- Price"
- Hotel URL
- Place URL (link to the hotel or booking page)
- Geo-coordinates
- Ticket pricing for attractions
- Rating
- Travel time for each location for {totalDays} days
- Each location's plan with the best time to visit
"Please return the information in JSON format.`;