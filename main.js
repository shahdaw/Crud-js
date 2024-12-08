const name = document.querySelector("#productName");
const category = document.querySelector("#productCategory");
const price = document.querySelector("#productPrice");
const description = document.querySelector("#productDescription");
const addBtn = document.querySelector("#click");
const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invalidDescription = document.querySelector(".invalid-description");
const deleteBtn = document.querySelector("#deleteBtn");
const clearBtn = document.querySelector("#clearBtn");
const search = document.querySelector("#search");

let products = [];
let currentIndex = null;


if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = true;

    const namePattern = /^[A-Z][a-z]{2,10}$/;
    if (!namePattern.test(name.value)) {
        invalidName.innerHTML = "this name is invalid . it must start with a capital letter and contain 2-10 char small letters";
        name.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidName.innerHTML = "";
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
    }

    const categoryPattern = /^[A-Z][a-z]{2,10}$/;
    if (!categoryPattern.test(category.value)) {
        invalidCategory.innerHTML = "this category is invalid . it must start with a capital letter and contain 2-10 char small letters";
        category.classList.add("is-invalid");
        isValid = false;

    } else {

        invalidCategory.innerHTML = "";
        category.classList.remove("is-invalid");
        category.classList.add("is-valid");

    }

    const pricePattern = /^[1-9][0-9]{2,3}$/;
    if (!pricePattern.test(price.value)) {
        invalidPrice.innerHTML = "this price is invalid . it must be between 100-9999";
        price.classList.add("is-invalid");
        isValid = false;

    } else {

        invalidPrice.innerHTML = "";
        price.classList.remove("is-invalid");
        price.classList.add("is-valid");

    }

    const descriptionPattern = /^[A-Z][a-z ]*$/;
    if (!descriptionPattern.test(description.value)) {
        invalidDescription.innerHTML = "this description is invalid . it must start with a capital letter and contain small letters";
        description.classList.add("is-invalid");
        isValid = false;

    } else {

        invalidDescription.innerHTML = "";
        description.classList.remove("is-invalid");
        description.classList.add("is-valid");

    }

    

    if (isValid) {
        const product = {
            name: name.value,
            category: category.value,
            price: price.value,
            description: description.value,
        };

        if (currentIndex === null) {
            
            products.push(product);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
    
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
    
            Toast.fire({
                icon: "success",
                title: "new product added successfully"
            });
        } else {
            
            products[currentIndex] = product;
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
    
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
    
            Toast.fire({
                icon: "success",
                title:  "Product updated successfully!"
            });
        
            currentIndex = null; 
            addBtn.value = "Add Product";
            addBtn.style.color = "";
            addBtn.classList.remove("btn-primary");
        }

        localStorage.setItem("products", JSON.stringify(products));

        displayProducts();

        clearInputs();
    }
});

function displayProducts() {
    const result = products.map((product, index) => {
        return `
<tr>
    <td>${index}</td>
    <td>${product.name}</td>
    <td>${product.category}</td>
    <td>${product.price}</td>
    <td>${product.description}</td>
    <td>
        <button class='btn btn-primary' onclick='editProduct(${index})'>Update</button>
        <button class='btn btn-danger' onclick='deleteProduct(${index})'>Delete</button>
    </td>
</tr>
        `;
    }).join('');

    document.querySelector("#data").innerHTML = result;
}

function deleteProduct(index){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            products.splice(index,1);
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

}

deleteBtn.addEventListener("click", () =>{

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            products = [];
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

})

search.addEventListener("input", (e) =>{
const keyword = search.value;
const productsResult = products.filter( (product)=>{

return product.name.toLowerCase().includes(keyword.toLowerCase());

});

const result = productsResult.map((product, index) => {

    return `

<tr>

<td>${index}</td>
<td>${product.name}</td>
<td>${product.category}</td>
<td>${product.price}</td>
<td>${product.description}</td>
<td>
<button class='btn btn-primary' onclick='editProduct(${index})'>Update</button>
<button class='btn btn-danger' onclick='deleteProduct(${index})'>delete</button>
</td>
</tr>

`;

}).join('');

document.querySelector("#data").innerHTML = result;

});

function editProduct(index) {
    const product = products[index];

    name.value = product.name;
    category.value = product.category;
    price.value = product.price;
    description.value = product.description;
    

    
    addBtn.value = "Update Product";
    addBtn.style.color = "white";
    addBtn.classList.add("btn-primary");
    currentIndex = index;

}

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
});

function clearInputs() {
    name.value = "";
    category.value = "";
    price.value = "";
    description.value = "";
    capacity.value = "";
}


















