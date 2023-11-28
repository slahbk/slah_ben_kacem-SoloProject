function generateID() {
    var count = 0;
    return function () {
      return count++;
    };
  }
  var id = generateID();
  
  function each(array, callback) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i)
    }
  }
    
  function filter(array, predicate) {
    var acc = [];
    each(array, function (element, index) {
      if (predicate(element, index)) {
        acc.push(element);
      }
    });
    return acc;
  }
  /**********************************************************************/
  
  // Factory function to create product objects
  function makeSomething(Name, Price, Category, Images) { 
    var i = 0

  // Function to toggle between images of a product
  function toggleImage() {
    i = (i+1) % bike1.Images.length
    $("#view1").attr("src", bike1.Images[i])
  }
  // Return a product object
    return {
    id:id(),
    Name,
    Price,
    Category,
    Images,
    toggleImage
    }
  }
    
  // Class function to create a shop object
  function MakeShop(shopName) {
    var instances = {}
    instances.shopname = shopName
    instances.list = []
    instances.add = add
    instances.update = update
    instances.display = display
    instances.sortPrice = sortPrice
    return instances
  }
  
  // Method to add a product to the shop's list
  var add = function(Name, Price, Category, Images){
    var product = makeSomething(Name, Price, Category, Images)
    this.list.push(product)
  }
  
  // Method to update a property of a product in the shop's list
  var update = function(id, ref, newValue){
    var selectId = filter(this.list, function(ele, i){
      return ele.id === id
    })
  
    if(selectId[0]){
      if (selectId[0].hasOwnProperty(ref)) {
        selectId[0][ref] = newValue
      }
      else console.log('there is no property called ' + ref)    
    }
    else console.log('id ' + id + ' not found')
    
  }
  
  // Method to display products based on category or name
  var display = function (categoryOrName){
    let result = []
    each(this.list, function(ele1, i){
      var values = Object.values(ele1)
        each(values, function(ele2, i){ // to search for string
          if(typeof(ele2) == 'string'){
            var words = ele2.split(' ') // maybe the string have two word so we split it
            each(words, function(word,i){
                if(word.toLowerCase() == categoryOrName.toLowerCase()){ // lowercase the input and the string in the list to avoid problem
                    result.push(ele1)
                }
            })  
          }
        })
          
    })
    if(result === 'empty'){
        console.log("no products in " + categoryOrName);
    }
    else return result 
  }
  
  // Method to sort products by price
  var sortPrice = function(){
    this.list.sort(function(a, b){return a.Price - b.Price}) // sorting from small to big
  }
  
  /********************************************************************** */
  // Create an instance of the shop
  var bikeShop = MakeShop('bikeShop')

  // Add products to the shop
  bikeShop.add('SANTA CRUZ V10', 6799, 'Bikes', ['https://www.santacruzbicycles.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fsantacruzbikesstatic%2Fa1e5f9b6-5c53-4d2c-9df0-791e235a196a_V10-bottom_Desktop.png%3Fauto%3Dcompress%2Cformat&w=2100&q=99',' https://www.santacruzbicycles.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fsantacruzbikesstatic%2F8a1e50a3-fd74-412c-9d8f-30165c590a80_MY24_V10_8_profile_desktop.jpg%3Fauto%3Dcompress%2Cformat&w=2100&q=99','https://www.santacruzbicycles.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fsantacruzbikesstatic%2F16fa60d5-8002-4091-825e-d74fa5f0e0db_Rear.png%3Fauto%3Dcompress%252Cformat%26fit%3Dcrop%26ar%3D9%253A7%26crop%3Dfaces%252Cedges&w=1200&q=75'])
  bikeShop.add('CANYON Speedmax CFR Disc Di2', 11999,'Bikes',['https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw835b17b9/images/full/full_2022_/2022/full_2022_speedmax-cfr-disc-di2_2921_bu-bk_P5.jpg?sw=1300&sfrm=png&q=90&bgcolor=F2F2F2','https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw3d17cccb/images/top/2921_TOP-1/2022/2921_TOP-1_speedmax-cfr-disc-di2_bu-bk_cockpit.jpg?sw=1300&sh=1300&sm=cut&sfrm=jpg&q=80','https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dwa9b38eb8/images/top/2921_TOP-4/2022/2921_TOP-4_speedmax-cfr-disc-di2_bu-bk_fork-disc.jpg?sw=1300&sh=1300&sm=cut&sfrm=jpg&q=80'])
  bikeShop.add('TREK Session 9 X01', 7199, 'Bikes', ['https://media.trekbikes.com/image/upload/f_auto,fl_progressive:semi,q_auto,w_1024,h_768,c_pad/Session9X01-24-41823-A-Portrait','https://media.trekbikes.com/image/upload/f_auto,fl_progressive:semi,q_auto,w_1024,h_768,c_pad/Session9X01-24-41823-A-Primary','https://p.vitalmtb.com/styles/full_size_1600/s3/photos/products/27491/photos/1782946/session_03.jpg?VersionId=3LARoXnYwYRasmJeIve36ZiwU0E4j0lh&itok=RohuFkje'])
  bikeShop.add("helmet Giro Aries Spherical", 299, 'accessories', ['https://m.media-amazon.com/images/I/61p5BUlV4sL._AC_SL1500_.jpg','https://m.media-amazon.com/images/I/61ttbjXAaQL._AC_SL1500_.jpg'])
  bikeShop.add("Water Bottle CamelBak Podium Dirt", 12.99, 'accessories', ['https://m.media-amazon.com/images/I/41BEL5b+xuL._AC_SL1000_.jpg','https://m.media-amazon.com/images/I/41rxqSDsCiL._AC_SL1000_.jpg','https://m.media-amazon.com/images/I/51FFOD1QeVL._AC_SL1500_.jpg'])
  bikeShop.add("Speedometer Sigma", 32.99, 'accessories', ['https://m.media-amazon.com/images/I/61I93QYjkxL._AC_SL1500_.jpg','https://m.media-amazon.com/images/I/71SW3Aa-gfL._AC_SL1500_.jpg','https://m.media-amazon.com/images/I/618vcB6P3AL._AC_SL1500_.jpg'])

  function displayAll(array){ // display all in the shop list
    $('#shopPage').empty() // we do that to avoid repeatition 
    each(array, function(ele, i){
      $('#shopPage').append(`
      <div class = 'product' id= 'item-${ele.id}'>
      <h1>${ele.Name}</h1>
      <h2>${'Price: ' + '$' + ele.Price}</h2>
      <h3>${'Category: ' + ele.Category}</h3>
      <img id= 'image-${ele.id}' src="${ele.Images[0]}">
      </div>
      `)
      
    var index = 0

    // Function to toggle between images of a product
    function toggleImage() {
      index = (index + 1) % ele.Images.length // loop all the images in the array 
      $(`#image-${ele.id}`).attr("src", ele.Images[index])
    }
    $(`#image-${ele.id}`).click(toggleImage)
  
    })

    function sortByPrice(){
        bikeShop.sortPrice()
        displayAll(bikeShop.list)  
      }
    $('#sortByPrice').click(sortByPrice)

    // Function to display products based on search input
    function displayBy(){
      var searchValue = $('#searchInput').val() // 
      var newList = bikeShop.display(searchValue)
      displayAll(newList)
    }
    $('#searching').click(displayBy)
    
}

// Display all products initially
displayAll(bikeShop.list)