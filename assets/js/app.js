const cl= console.log;
const postForm = document.getElementById('postForm');
const titleControl = document.getElementById('title');
const contentControl= document.getElementById('content');
const userIdControl= document.getElementById('userId');
const cardContainer = document.getElementById('cardContainer');
const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")


let baseurl=`https://jsonplaceholder.typicode.com/`;

const postUrl =`${baseurl}/posts`
const onDelete = (ele) => {               
    Swal.fire({
        title: "Do you want to remove this post?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText:` Don't remove`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            cl(ele);
                let deleteId = ele.closest(".card").id;
                cl(deleteId);
                let deleteUrl = `${baseurl}/posts/${deleteId}`;

                fetch (deleteUrl,{
                    method:"DELETE",
                    header :
                    {
                        'content-type':'application/json',
                        'token': 'karan'
                    }
                })
                .then(res=>{
                    return res.json()
                })
                .then(data=>{
                    cl(data)
                    document.getElementById(deleteId).remove()
                    Swal.fire({
                        title: `Post is deleteded successfully !!!`,
                        icon: `success`,
                        timer: 2000
                     })
                })
                .catch(err => {
                    cl(err)
                })
                .finally(() => {
                    loader.classList.add("d-none");
                })
    } 
       
 });
    
 };

const onEdit =(ele)=>{
    let editId = ele.closest(".card").id;
    localStorage.setItem("editId",editId);
    let editUrl=`${baseurl}/posts/${editId}`;
    fetch (editUrl,{
        method:"GET",
        header :
        {
            'content-type':'application/json',
            'token': 'karan'
        }
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        cl(data)
        titleControl.value=data.title;
        contentControl.value=data.body;
        userIdControl.value=data.userId;
        submitBtn.classList.add("d-none")
        updateBtn.classList.remove("d-none")
    })
    .catch(cl)
}

const CardTeamplating=(arr)=>{
    cardContainer.innerHTML= arr.map(post =>{
        return `
        <div class="card mb-4" id="${post.id}">
                         <div class="card-header">
                            <h4 class="m-0">${post.title}</h4>
                        </div>
                        <div class="card-body">
                             <p class="m-0">${post.body}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                        <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                        </div>    
                    </div>`
    }).join('')
}

const creatCard= (obj)=>{
        let card = document.createElement("div");
          card.id=obj.id;
          card.className='card mb-4'
          card.innerHTML= `
                            <div class="card-header">
                            <h4 class="m-0">${obj.title}</h4>
                            </div>
                        <div class="card-body">
                            <p class="m-0">${obj.body}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                            <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                            </div>  `
                            cardContainer.append(card)
}

fetch(postUrl,{
    
    method : "GET",
    header :
{
    'content-type':'application/json',
    'token': 'karan'
}
})
.then(res=>{
    return res.json()
})
.then(data =>{
    // cl(data)
    CardTeamplating(data)
})
.catch(cl)
const onPostSubmited =(eve)=>{
    eve.preventDefault();
    let obj={
        title:titleControl.value,
        body:contentControl.value,
        userId:userIdControl.value
    }
    // cl(obj)
    fetch(postUrl, {
        method: "POST",
        headers:{
            'content-type':'application/json',
            'token': 'karan'
        }
    })
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        // cl(data)
        obj.id=data.id;
       creatCard(obj)
    })
    .catch(cl)
    Swal.fire({
        title : `Post is Add Successfully !!!`,
        icon : "success",
        timer : 2000
    })
    
}

const onPostUpdate=()=>{
    let updatedObj={
        
            title:titleControl.value,
            body:contentControl.value,
            userId:userIdControl.value
    }
    cl(updatedObj)
    let updatedId=localStorage.getItem("editId")
    let updatedUrl = `${baseurl}posts/${updatedId}`;
    fetch(updatedUrl,{
        method:"PATCH",
        body: JSON.stringify(updatedObj),
        headers:{
            'content-type':'application/json',
            'token': 'karan'
        }
    })
    .then(res=>{
        return res .json()
    })
    .then(data =>{
        cl(data)
        updatedObj.id = updatedId
        let card = [...document.getElementById(updatedObj.id).children];
        cl(card)
        card[0].innerHTML =  `<h4 class="m-0">${updatedObj.title}</h4>`;
        card[1].innerHTML = ` <p class="m-0">${updatedObj.body}</p>`;
        Swal.fire({
            title : `Post is Updated Successfully !!!`,
            icon : "success",
            timer : 2000
        })
        
    })
    .catch(cl)
    .finally(() => {
        loader.classList.add("d-none");
        postForm.reset();

        updateBtn.classList.add("d-none");
        submitBtn.classList.remove("d-none");
    })
}

postForm.addEventListener("submit", onPostSubmited)
updateBtn.addEventListener("click", onPostUpdate)





















// const inptT= document.getElementById("inptT")
// const btn= document.getElementById("btn")

// const karan=["karan","ankita","Pratiksha","kiran"]

// const onchange=()=>{
//     let husen=inptT.value
//     if(karan.includes(husen)){
//         alert("name is successully")
//     }else{
//         alert('not match')
//     }
// }



// const onchange=()=>{
//     let husen=inptT.value
//     if(husen==='karan'&&'ankita'){
//         alert("successful")
//     }else{
//         alert('fail')
//     }
// }




// btn.addEventListener("click", onchange)



// const cl = console.log

// let arrs =[ "karan","pratiksha","kiran","aarohi","sakshi"];
// let str1= arrs.slice(-2)//undefine // aarohi sakshi // empty
// cl(str1)
//  arrs.splice(1, 1)// 


// let arr =[10,20,30,40,60,5,5];

let str = "i love javascript" // i evol tpircsavaj


