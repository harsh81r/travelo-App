

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
export const AIModel ='Generate Travel plan for {Location}: ,for  {totalDays} For {traveler} with a cheap {budget}, give me a hotels options list with Hotel name ,Hotel address,price,hotelimage,url,geo coordinates,ticket Princing, rating ,Time travel each of the location for {totalDays} with eachday plan with best time to visit in JSON format'; 