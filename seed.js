var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: 'Cloud Rest',
        image: "https://farm2.staticflickr.com/1583/26517785445_877e85d159.jpg",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "
    },
    {
        name: 'Montain',
        image: "https://farm1.staticflickr.com/37/92817991_dad2a04af0.jpg",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "
    },
    {
        name: 'Sea Side',
        image: "https://farm1.staticflickr.com/37/92817991_dad2a04af0.jpg",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "
    },
    {
        name: 'Brighton',
        image: "https://farm8.staticflickr.com/7534/26853325155_2712185c6e.jpg",
        description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "
    }
    ];
    
function seedDB() {
    //remove all campgrounds
    Campground.remove({},function(err){
    if(err) {
        console.log(err);
    }else {
        console.log('Removed campgrounds!');
        //add few camgrounds
    //     data.forEach(function(seed) {
    //         Campground.create(seed,function(err,campground) {
    //             if(err) {
    //                 console.log(err)
    //                 } else {
    //                     console.log('Added campground ', seed.name);
    //                     Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was internet",
    //                             author: "Homer"
    //                         }, function(err,comment) {
    //                             if(err) {
    //                                 console.log(err)
    //                             }else {
    //                                 campground.comments.push(comment);
    //                                 campground.save(); 
    //                                 console.log("Created new comment");
    //                             }
                               
    //                         });
    //                 }
    //         });
    //     });
    }
        
    });
    


}

module.exports = seedDB;



