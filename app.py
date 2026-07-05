import os
import json
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

# Define data directory and paths
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
MENU_FILE = os.path.join(DATA_DIR, 'menu.json')
CONTACTS_FILE = os.path.join(DATA_DIR, 'contacts.json')
BOOKINGS_FILE = os.path.join(DATA_DIR, 'bookings.json')

# Pegs Restaurant — Multi-Cuisine Menu
DEFAULT_MENU = [
    {
        "id": 0, "name": "Paneer Tikka", "price": "₹280", "category": "starters",
        "image": "assets/Paneer_Butter_Masala.png",
        "desc": "Marinated cottage cheese cubes grilled to perfection in a tandoor with bell peppers and onions. Served with mint chutney.",
        "ingredients": ["Paneer", "Bell Pepper", "Yogurt", "Spices"],
        "spice": 2, "spiceLabel": "Medium"
    },
    {
        "id": 1, "name": "Crispy Veg Spring Rolls", "price": "₹220", "category": "starters",
        "image": "assets/Medu_Vada.png",
        "desc": "Golden-fried crispy rolls stuffed with a savory mix of fresh vegetables and aromatic herbs. Served with sweet chili sauce.",
        "ingredients": ["Vegetables", "Spring Roll Sheets", "Herbs", "Soy"],
        "spice": 1, "spiceLabel": "Mild"
    },
    {
        "id": 2, "name": "Masala Dosa", "price": "₹120", "category": "indian",
        "image": "assets/Masala_Dosa.png",
        "desc": "Crispy golden dosa filled with spiced potato masala, served with sambar and coconut chutney. A South Indian classic.",
        "ingredients": ["Rice", "Potato", "Spices", "Ghee"],
        "spice": 2, "spiceLabel": "Medium"
    },
    {
        "id": 3, "name": "Butter Chicken", "price": "₹380", "category": "indian",
        "image": "assets/Paneer_Butter_Masala.png",
        "desc": "Tender chicken pieces in a rich, creamy tomato-butter sauce with aromatic spices. Paired with naan or jeera rice.",
        "ingredients": ["Chicken", "Tomato", "Cream", "Butter", "Spices"],
        "spice": 1, "spiceLabel": "Mild"
    },
    {
        "id": 4, "name": "South Indian Meals", "price": "₹180", "category": "indian",
        "image": "assets/South_Indian_Meals.png",
        "desc": "Traditional vegetarian thali with steamed rice, sambar, rasam, two vegetable curries, papad, pickle, and curd.",
        "ingredients": ["Rice", "Sambar", "Rasam", "Vegetables"],
        "spice": 1, "spiceLabel": "Mild"
    },
    {
        "id": 5, "name": "Ghee Roast Dosa", "price": "₹140", "category": "indian",
        "image": "assets/Ghee_Roast_Dosa.png",
        "desc": "Crispy dosa generously cooked in pure ghee with a crunchy exterior. Served with sambar and chutney.",
        "ingredients": ["Rice", "Ghee", "Butter", "Potatoes"],
        "spice": 1, "spiceLabel": "Mild"
    },
    {
        "id": 6, "name": "Chilli Chicken", "price": "₹340", "category": "chinese",
        "image": "assets/Paneer_Butter_Masala.png",
        "desc": "Succulent chicken tossed with green chilies, bell peppers, and soy sauce in a fiery Indo-Chinese preparation.",
        "ingredients": ["Chicken", "Bell Pepper", "Soy Sauce", "Chili"],
        "spice": 3, "spiceLabel": "Spicy"
    },
    {
        "id": 7, "name": "Veg Manchurian", "price": "₹260", "category": "chinese",
        "image": "assets/Medu_Vada.png",
        "desc": "Deep-fried vegetable balls tossed in a tangy, spicy Manchurian gravy with spring onions and soy sauce.",
        "ingredients": ["Mixed Veg", "Corn Flour", "Soy Sauce", "Garlic"],
        "spice": 2, "spiceLabel": "Medium"
    },
    {
        "id": 8, "name": "Hakka Noodles", "price": "₹240", "category": "chinese",
        "image": "assets/South_Indian_Meals.png",
        "desc": "Stir-fried noodles tossed with crunchy vegetables, soy sauce, and aromatic spices. Available veg and chicken.",
        "ingredients": ["Noodles", "Vegetables", "Soy Sauce", "Sesame Oil"],
        "spice": 1, "spiceLabel": "Mild"
    },
    {
        "id": 9, "name": "Grilled Chicken Steak", "price": "₹420", "category": "continental",
        "image": "assets/Paneer_Butter_Masala.png",
        "desc": "Juicy herb-marinated chicken breast grilled to perfection, served with mashed potatoes and sauteed vegetables.",
        "ingredients": ["Chicken", "Herbs", "Potato", "Vegetables"],
        "spice": 0, "spiceLabel": "Not Spicy"
    },
    {
        "id": 10, "name": "Pasta Alfredo", "price": "₹340", "category": "continental",
        "image": "assets/South_Indian_Meals.png",
        "desc": "Creamy penne pasta in a rich parmesan alfredo sauce with garlic, mushrooms, and fresh herbs.",
        "ingredients": ["Pasta", "Cream", "Parmesan", "Garlic", "Mushrooms"],
        "spice": 0, "spiceLabel": "Not Spicy"
    },
    {
        "id": 11, "name": "South Indian Filter Coffee", "price": "₹60", "category": "beverages",
        "image": "assets/South_Indian_Filter_Coffee.png",
        "desc": "Strong, aromatic coffee freshly brewed with a traditional metal filter and steamed milk. The perfect pick-me-up.",
        "ingredients": ["Coffee Beans", "Milk", "Sugar", "Chicory"],
        "spice": 0, "spiceLabel": "Not Spicy"
    },
    {
        "id": 12, "name": "Mango Lassi", "price": "₹120", "category": "beverages",
        "image": "assets/South_Indian_Filter_Coffee.png",
        "desc": "Refreshing yogurt-based smoothie blended with ripe Alphonso mangoes, cardamom, and a touch of honey.",
        "ingredients": ["Yogurt", "Mango", "Cardamom", "Honey"],
        "spice": 0, "spiceLabel": "Not Spicy"
    },
    {
        "id": 13, "name": "Fresh Lime Soda", "price": "₹80", "category": "beverages",
        "image": "assets/South_Indian_Filter_Coffee.png",
        "desc": "Zesty fresh lime juice with sparkling soda, a pinch of salt, and a hint of cumin. Sweet or salted.",
        "ingredients": ["Lime", "Soda", "Salt", "Cumin"],
        "spice": 0, "spiceLabel": "Not Spicy"
    },
    {
        "id": 14, "name": "Gulab Jamun", "price": "₹120", "category": "desserts",
        "image": "assets/Gulab_Jamun.png",
        "desc": "Soft, spongy milk-powder dumplings soaked in rose-cardamom sugar syrup, served warm. A classic Indian sweet.",
        "ingredients": ["Milk Powder", "Rose Water", "Cardamom", "Sugar"],
        "spice": 0, "spiceLabel": "Not Spicy"
    },
    {
        "id": 15, "name": "Rasmalai", "price": "₹150", "category": "desserts",
        "image": "assets/Gulab_Jamun.png",
        "desc": "Delicate cottage cheese patties immersed in sweetened, saffron-flavored milk garnished with pistachios and almonds.",
        "ingredients": ["Paneer", "Milk", "Saffron", "Pistachios"],
        "spice": 0, "spiceLabel": "Not Spicy"
    }
]

def init_db():
    """Create data directory and initial JSON database files if they don't exist."""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR, exist_ok=True)
        
    # Always overwrite menu to keep it synced with code updates
    with open(MENU_FILE, 'w', encoding='utf-8') as f:
        json.dump(DEFAULT_MENU, f, indent=4, ensure_ascii=False)
            
    if not os.path.exists(CONTACTS_FILE):
        with open(CONTACTS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
            
    if not os.path.exists(BOOKINGS_FILE):
        with open(BOOKINGS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)

# Always initialize on startup (works with Flask debug reloader)
init_db()

# Serve static web pages
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/about')
def about_page():
    return send_from_directory('.', 'about.html')

@app.route('/menu')
def menu_page():
    return send_from_directory('.', 'menu.html')

@app.route('/favicon.ico')
def favicon():
    return '', 204

# API Endpoints
@app.route('/api/status', methods=['GET'])
def api_status():
    """Health check endpoint."""
    return jsonify({
        "status": "ok",
        "hotel": "Hotel Rays Inn",
        "restaurant": "Pegs Restaurant",
        "location": "Dharmastala, Karnataka"
    })

@app.route('/api/menu', methods=['GET'])
def get_menu():
    """Retrieve all menu items."""
    try:
        with open(MENU_FILE, 'r', encoding='utf-8') as f:
            menu_data = json.load(f)
        return jsonify(menu_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Record contact form submissions."""
    try:
        data = request.get_json() or {}
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        inquiry_type = data.get('type', '').strip()
        message = data.get('message', '').strip()
        
        # Validation
        if not all([name, email, phone, inquiry_type, message]):
            return jsonify({"error": "All fields are required"}), 400
            
        new_inquiry = {
            "name": name,
            "email": email,
            "phone": phone,
            "type": inquiry_type,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        
        # Read current list and append
        try:
            with open(CONTACTS_FILE, 'r+', encoding='utf-8') as f:
                contacts = json.load(f)
                contacts.append(new_inquiry)
                f.seek(0)
                json.dump(contacts, f, indent=4)
                f.truncate()
        except (IOError, OSError) as fs_err:
            print(f"[Warning] Read-only filesystem detected, logging inquiry to console: {new_inquiry}. Error: {fs_err}")
            
        return jsonify({"success": True, "message": "Inquiry submitted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/book-table', methods=['POST'])
def book_table():
    """Record a table reservation or room booking request."""
    try:
        data = request.get_json() or {}
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        date = data.get('date', '').strip()
        time = data.get('time', '').strip()
        guests = data.get('guests', '').strip()
        
        # Validation
        if not all([name, email, phone, date, time, guests]):
            return jsonify({"error": "All booking fields are required"}), 400
            
        new_booking = {
            "name": name,
            "email": email,
            "phone": phone,
            "date": date,
            "time": time,
            "guests": guests,
            "timestamp": datetime.now().isoformat()
        }
        
        # Read current list and append
        try:
            with open(BOOKINGS_FILE, 'r+', encoding='utf-8') as f:
                bookings = json.load(f)
                bookings.append(new_booking)
                f.seek(0)
                json.dump(bookings, f, indent=4)
                f.truncate()
        except (IOError, OSError) as fs_err:
            print(f"[Warning] Read-only filesystem detected, logging booking to console: {new_booking}. Error: {fs_err}")
            
        return jsonify({"success": True, "message": "Booking confirmed successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run server on port 8000
    app.run(host='0.0.0.0', port=8000, debug=True)
