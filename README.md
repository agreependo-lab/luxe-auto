````markdown
# Luxe Auto - Premium Car Marketplace

A modern, luxury-focused car marketplace platform built with vanilla HTML, CSS, and JavaScript. Luxe Auto connects car buyers and sellers in an elegant, user-friendly environment.

## Features

*Author: Gloria Pendo*

A modern, luxury-focused car marketplace platform built with vanilla HTML, CSS, and JavaScript. Luxe Auto connects car buyers and sellers in an elegant, user-friendly environment.
````

### For Buyers
- **Browse Listings**: View all available cars with detailed information
- **Search & Filter**: Find cars by brand, model, price, and other specifications
- **Save Favorites**: Bookmark cars you're interested in
- **View Details**: Access comprehensive car information and seller contact details
- **Contact Sellers**: Submit inquiries directly to sellers through the contact form

### For Sellers
- **List Cars**: Post your vehicle listings with detailed specifications
- **Upload Images**: Add photos to showcase your cars
- **Manage Listings**: Edit and delete your car listings
- **Track Inquiries**: View buyer inquiries and contact information

### General
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: All data is stored locally in the browser
- **Gold & Black Theme**: Premium luxury aesthetic with gold accents

## Technology Stack

- **HTML5**: Semantic markup and page structure
- **CSS3**: Advanced styling with flexbox and grid layouts
- **JavaScript (Vanilla)**: No dependencies, pure JavaScript functionality
- **Local Storage API**: Data persistence without a backend

## Project Structure

```
luxe-auto/
├── index.html          # Homepage with hero section
├── buyer.html          # Buyer dashboard with car listings
├── seller.html         # Seller form to list cars
├── contact.html        # Contact information page
├── styles.css          # Global styles and responsive design
├── script.js           # Main JavaScript functionality
└── README.md          # This file
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/luxe-auto.git
cd luxe-auto
```

2. Open in your browser:
- Simply open `index.html` in your web browser
- Or use a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server)
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

## Usage

### For Buyers
1. Navigate to the **Buyer** section
2. Browse available car listings
3. Use the search bar to find specific cars
4. Filter by price and brand
5. Click "View Details" to see full car information
6. Click "❤️ Save" to add cars to your favorites
7. Fill out the buyer contact form to inquire about a car

### For Sellers
1. Navigate to the **Seller** section
2. Fill in your car details (brand, model, year, price, etc.)
3. Add a photo of your car (optional)
4. Submit your listing
5. View and manage your listings in "My Listings"
6. Edit or delete listings as needed

## Features in Detail

### Data Storage
All data is stored in browser's Local Storage:
- **cars**: Array of all car listings
- **favorites**: Array of favorited car IDs
- **contacts**: Contact form submissions
- **buyerInquiries**: Buyer inquiry submissions

### Sample Data
The application comes with 2 sample cars pre-loaded on first visit:
- Honda Civic (2019)
- Toyota Corolla (2018)

### Responsive Breakpoints
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (optimized grid)
- **Mobile**: Below 768px (single column)

## Color Scheme

- **Primary Gold**: `#d4af37`
- **Dark Background**: `#0a0a0a`
- **Card Background**: `#1a1a1a`
- **Text White**: `#ffffff`
- **Text Gray**: `#b0b0b0`
- **Accent Pink**: `#ff4081`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: Requires Local Storage support (all modern browsers)

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced filtering options
- [ ] Car comparison tool
- [ ] User ratings and reviews
- [ ] Admin dashboard

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@luxeauto.com
- Phone: +254 700 000000

---

**Luxe Auto** - Where Luxury Meets Convenience ✨
````

This README provides:
- Clear project overview
- Feature descriptions for buyers and sellers
- Technology stack information
- Installation & setup instructions
- Usage guidelines
- File structure
- Color scheme reference
- Browser support info
- Future enhancement roadmap