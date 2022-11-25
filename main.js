let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let tmp;
//console.log(title,price,taxes,ads,discount,total,count,category,submit);

//get total
function gettotal(){
    if(price.value !=''){
        let result=((+price.value * (+taxes.value / 100) + +price.value ) + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='rgb(14, 192, 14)';
    }else{
        total.innerHTML = '';
    }

}


//create
let data;
if(localStorage.products !=null){
    data=JSON.parse(localStorage.products)
}else{
    data = [];
}
//let data = [];

submit.onclick = function(){
    let product = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value,

    }
    if(mood==='create'){
        if(product.count>1){
            for(let i=0; i<product.count; i++){
                data.push(product);
            }
        }else{
            data.push(product);
        }
    }else{
        data[tmp]=product;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }

    //data.push(product);
    //save to local storage
    localStorage.setItem('products',  JSON.stringify(data)  )
    //console.log(product);
    cleardata();
    showdata();
}


//clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

//read
function showdata(){
    gettotal();
    let table = '';
    for(let i=0; i<data.length; i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].count}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updatedata(${i})"id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
        `;
        //console.log(table)
    }

    document.getElementById('tbody').innerHTML = table;
    let btndelete=document.getElementById('deleteall');
    if(data.length>0){
        btndelete.innerHTML=`
        
        <button onclick="deleteall()">delete all products (${data.length})</button>
        
        `
    }else{
        btndelete.innerHTML=``;
    }

}

showdata();
//delete product
function deletedata(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showdata();
}

//delete all products
function deleteall(){
    localStorage.clear();
    data.splice(0)
    showdata();
}

//update the data
function updatedata(i){
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
    gettotal();
    count.style.display='none';
    category.value=data[i].category;
    submit.innerHTML='update data'
    mood='update';
    tmp=i;
    scroll({top:0,behavior:'smooth'})
}

//search moood
let searchmood='title';
function getmood(id){
    let search=document.getElementById('search');
    if(id=='searchtitle'){
        searchmood='title';
        search.placeholder='search by title';
    }else{
        searchmood='category';
        search.placeholder='search by category';
    }
    search.focus();

}
//search
function searchdata(value){
    let table='';
    if(searchmood == 'title'){
        for(let i=0;i<data.length;i++){
            if(data[i].title.includes(value)){
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updatedata(${i})"id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }

    }else{
        for(let i=0;i<data.length;i++){
            if(data[i].category.includes(value)){
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updatedata(${i})"id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;


}