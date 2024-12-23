// User Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    verificationStatus: { type: Boolean, default: false }, // For user verification
    profilePicture: { 
        type: String, 
        default: 'default-profile-picture.jpg' 
    }
});
const User = mongoose.model('User', userSchema);

// Book Model
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isbn: { type: String, unique: true },
    publicationDate: { type: Date },
    contentType: { type: String, enum: ['PDF', 'ePub'], required: true },
    contentURL: { type: String, required: true },
    verifiedStatus: { type: Boolean, default: false } // For book verification
});
const Book = mongoose.model('Book', bookSchema);



// Library Model
const librarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

const Library = mongoose.model('Library', librarySchema);

// BookLibrary Model (for linking User's Library and Books)
const bookLibrarySchema = new mongoose.Schema({
    library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    progress: { type: Number, default: 0 } // Assuming progress is a percentage
});

const BookLibrary = mongoose.model('BookLibrary', bookLibrarySchema);

// Geography Model
const geographySchema = new mongoose.Schema({
    country: { type: String, required: true },
    region: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

const Geography = mongoose.model('Geography', geographySchema);

// BookGeography Model (for linking Books to Geography)
const bookGeographySchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    geography: { type: mongoose.Schema.Types.ObjectId, ref: 'Geography', required: true },
    quantity: { type: Number, default: 1 } // Number of books from this location
});

const BookGeography = mongoose.model('BookGeography', bookGeographySchema);

const wishlistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true // One wishlist per user
    }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

// BookWishlist Schema (Linking Table)
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

module.exports = { User, Book, Library, BookLibrary, Geography, BookGeography, Wishlist, BookWishlist };