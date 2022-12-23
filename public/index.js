
fetch("http://localhost:3000/api/v1/feedbacks")
.then(res=>res.json())
.then(data=>{
    data=JSON.parse(data)
    document.getElementsByTagName("h2")[0].innerHTML=data.questions[0].content
})
let scoreRate=0;
let score=document.querySelectorAll(".score-bar-item")
console.log(score);
score.forEach((item)=>{
    item.addEventListener("click",()=>{
        scoreRate=item.innerHTML
        console.log(scoreRate);
    })
})
