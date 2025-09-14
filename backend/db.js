const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/BLOG_WEB";

const connecttomongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
    }
};

module.exports = connecttomongo;








// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));