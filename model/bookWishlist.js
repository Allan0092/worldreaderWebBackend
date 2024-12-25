const mongoose = require('mongoose');

const bookWishlistSchema = new mongoose.Schema({
    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true
    },
    wishlist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Wishlist', 
        required: true
    }
});

// Composite unique index for ensuring a book can only be once in a wishlist
bookWishlistSchema.index({ book: 1, wishlist: 1 }, { unique: true });

const BookWishlist = mongoose.model('BookWishlist', bookWishlistSchema);

module.exports = BookWishlist;