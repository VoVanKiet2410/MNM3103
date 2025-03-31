let mongoose = require('mongoose');
let Role = require('../schemas/role');

//run: node utils/seed_roles.js để create data 
// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/S2', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function seedRoles() {
    try {
        // Xóa các role cũ (nếu cần)
        await Role.deleteMany({});

        // Thêm các role mới
        await Role.create([
            { name: 'admin', description: 'Administrator role with full permissions' },
            { name: 'mod', description: 'Moderator role with limited permissions' },
            { name: 'user', description: 'Regular user role' }
        ]);

        console.log('Roles seeded successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding roles:', error);
        mongoose.disconnect();
    }
}

seedRoles();