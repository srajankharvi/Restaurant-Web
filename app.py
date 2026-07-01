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

# Initial default menu data mapping to local assets
DEFAULT_MENU = [
    {
        "id": 0,
        "name": "Masala Dosa",
        "price": "₹80",
        "category": "dosa",
        "image": "assets/Masala_Dosa.png",
        "desc": "Crispy, golden dosa filled with spiced potato and served with hot sambar, coconut chutney, and filter coffee. A classic South Indian breakfast specialty.",
        "ingredients": ["Rice", "Potato", "Spices", "Ghee"],
        "spice": 2,
        "spiceLabel": "Medium"
    },
    {
        "id": 1,
        "name": "Medu Vada",
        "price": "₹60",
        "category": "breakfast",
        "image": "assets/Medu_Vada.png",
        "desc": "Soft, fluffy lentil fritters with a delicate hole in the center, served with hot sambar and tangy coconut chutney. A traditional South Indian delight.",
        "ingredients": ["Urad Dal", "Cumin", "Green Chili", "Asafetida"],
        "spice": 1,
        "spiceLabel": "Mild"
    },
    {
        "id": 2,
        "name": "Idli Sambar",
        "price": "₹70",
        "category": "breakfast",
        "image": "assets/Medu_Vada.png",
        "desc": "Steamed soft rice and lentil cakes served with spicy vegetable sambar and tangy coconut chutney. A nutritious and authentic South Indian breakfast.",
        "ingredients": ["Rice", "Urad Dal", "Spices", "Vegetables"],
        "spice": 2,
        "spiceLabel": "Medium"
    },
    {
        "id": 3,
        "name": "South Indian Meals",
        "price": "₹120",
        "category": "meals",
        "image": "assets/South_Indian_Meals.png",
        "desc": "Traditional vegetarian meal with steamed rice, sambar, rasam, vegetable curry, pappad, pickle, and curd. A complete and wholesome dining experience.",
        "ingredients": ["Rice", "Sambar", "Rasam", "Vegetables"],
        "spice": 1,
        "spiceLabel": "Mild"
    },
    {
        "id": 4,
        "name": "Ghee Roast Dosa",
        "price": "₹100",
        "category": "dosa",
        "image": "assets/Ghee_Roast_Dosa.png",
        "desc": "Crispy dosa cooked in pure ghee with a crunchy exterior, served with sambar, chutney, and hot filter coffee. A rich and indulgent treat.",
        "ingredients": ["Rice", "Ghee", "Butter", "Potatoes"],
        "spice": 1,
        "spiceLabel": "Mild"
    },
    {
        "id": 5,
        "name": "South Indian Filter Coffee",
        "price": "₹40",
        "category": "beverages",
        "image": "assets/South_Indian_Filter_Coffee.png",
        "desc": "Strong, aromatic South Indian coffee freshly brewed with a traditional metal filter and steamed milk. The perfect companion to any meal.",
        "ingredients": ["Coffee Beans", "Milk", "Sugar", "Chicory"],
        "spice": 0,
        "spiceLabel": "Not Spicy"
    },
    {
        "id": 6,
        "name": "Paneer Butter Masala",
        "price": "₹150",
        "category": "meals",
        "image": "assets/Paneer_Butter_Masala.png",
        "desc": "Soft paneer cubes in a creamy tomato and butter sauce with aromatic spices, served with basmati rice or freshly made roti.",
        "ingredients": ["Paneer", "Tomato", "Cream", "Butter", "Spices"],
        "spice": 1,
        "spiceLabel": "Mild"
    },
    {
        "id": 7,
        "name": "Gulab Jamun",
        "price": "₹50",
        "category": "desserts",
        "image": "assets/Gulab_Jamun.png",
        "desc": "Soft, spongy milk powder balls soaked in fragrant rose and cardamom flavored sugar syrup, served warm. The perfect sweet ending to your meal.",
        "ingredients": ["Milk Powder", "Rose Water", "Cardamom", "Sugar Syrup"],
        "spice": 0,
        "spiceLabel": "Not Spicy"
    }
]

def init_db():
    """Create data directory and initial JSON database files if they don't exist."""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR, exist_ok=True)
        
    if not os.path.exists(MENU_FILE):
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
        "restaurant": "Woodlands Restaurant",
        "location": "Udupi, Karnataka"
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
        with open(CONTACTS_FILE, 'r+', encoding='utf-8') as f:
            contacts = json.load(f)
            contacts.append(new_inquiry)
            f.seek(0)
            json.dump(contacts, f, indent=4)
            f.truncate()
            
        return jsonify({"success": True, "message": "Inquiry submitted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/book-table', methods=['POST'])
def book_table():
    """Record a table reservation request."""
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
        with open(BOOKINGS_FILE, 'r+', encoding='utf-8') as f:
            bookings = json.load(f)
            bookings.append(new_booking)
            f.seek(0)
            json.dump(bookings, f, indent=4)
            f.truncate()
            
        return jsonify({"success": True, "message": "Table booked successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run server on port 8000
    app.run(host='0.0.0.0', port=8000, debug=True)
