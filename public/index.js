

let scoreRate=0;
let score=document.querySelectorAll(".score-bar-item")
console.log(score);
score.forEach((item)=>{
    item.addEventListener("click",()=>{
        score.forEach(item=>item.classList.remove("active"))
        item.classList.toggle("active")
        scoreRate=item.innerHTML
    })
})
let input=document.querySelector(".input-feedback")
let send_btn=document.querySelector(".send-fb")
let render=function(params) {
    fetch("http://localhost:3000/api/v1/feedbacks")
.then(res=>res.json())
.then(data=>{
    data=JSON.parse(data)
    document.getElementsByTagName("h2")[0].innerHTML=data.questions[0].content
    let string=""
    let totalsore=0;
    for (let index = 0; index < data.answers.length; index++) {
        string+=`
        <div class="feedback-container_body_content" id="${data.answers[index].id}">
        <p>${data.answers[index].content}</p>
        <span><i class="fa-solid fa-pen-to-square"></i>&nbsp<i class="fa-solid fa-square-xmark"></i></span>
        <button class="feedback-container_body_content_score">${data.answers[index].score}</button>
    </div>
        `
        totalsore+=Number(data.answers[index].score)
    }
    console.log(totalsore);
    document.querySelector(".feedback-container_body").innerHTML=string
    document.querySelector(".feedback-container_rating").children[0].innerHTML=`${data.answers.length} reviews`
    document.querySelector(".feedback-container_rating").children[1].innerHTML=`Average rating:${Math.round(totalsore/data.answers.length)}`
    let feebackBody=document.querySelectorAll(".feedback-container_body_content")
    console.log(feebackBody);
    let idAnswers; 
    let currentFeedback=""
    let method="post"
    feebackBody.forEach((item,index)=>{
        item.addEventListener("click",(e)=>{
            if (e.target.classList.contains("fa-pen-to-square")) {
                method="put"
                console.log(item.children[0].innerHTML);
                console.log(item.children[2].innerHTML);
                input.value= item.children[0].innerHTML
                score.forEach(item=>item.classList.remove("active"))
                score[item.children[2].innerHTML-1].classList.add("active")
                console.log(item.id);
                idAnswers=item.id
                currentFeedback=item.children[0].innerHTML
                scoreRate=item.children[2].innerHTML
            }
            //delelte
            if (e.target.classList.contains("fa-square-xmark")) {
                let cf=confirm("Bạn có chắc chắn muốn xóa feedback không")
                if (cf==true) {
                    fetch(`http://localhost:3000/api/v1/feedbacks/${item.id}`,{
                        method:"DELETE",
                    })
                    .then(res=>res.json())
                    .then(()=>{
                        alert("xóa fb thành công")
                        render();
                    })
                }
            }
                
        })
    })
    // POST AND PUT
    send_btn.addEventListener("click",()=>{
        if (method=="post") //post feedback
        { 
            if (input.value!=""&&scoreRate!=0) {
                fetch("http://localhost:3000/api/v1/feedbacks",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json",
                    },
                    body:JSON.stringify({
                        content:input.value,
                        score:scoreRate,
                        id:data.answers.length,
                    })
                })
                .then(res=>res.json())
                .then(()=>{
                    alert("add feedback Success")
                    window.location.reload()
                })
            }
        }else{
            //PUT FEEDBACK
            fetch(`http://localhost:3000/api/v1/feedbacks/${idAnswers}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                   content:input.value,
                   score:scoreRate,
                   id: idAnswers
                })
            })
            .then(res=>res.json())
            .then(()=>{
                alert("update feedback Success")
                window.location.reload()
            })
        }
    })

})
}
render();

