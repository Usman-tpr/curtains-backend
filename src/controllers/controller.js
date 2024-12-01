const Admin = require("../models/adminModel")
const Post = require("../models/postMOdel")
const Contact = require("../models/ContactModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")

const signUp = async (req, res) => {
    try {
        const saltRounds = 10;

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Update the password in the request body
        req.body.password = hashedPassword;

        // Create a new admin instance
        const admin = new Admin(req.body);

        // Save the admin to the database
        await admin.save();

        // Exclude the password from the response
        const { password, ...adminResponse } = admin.toObject();

        res.status(201).send({
            success: true,
            body: adminResponse, // Send only the necessary admin details
            error: null
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: "Server error: " + error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the admin exists
        const isExist = await Admin.findOne({ email });
        if (!isExist) {
            return res.status(401).send({
                success: false,
                body: null,
                error: "Invalid email or password", // Generic message
            });
        }

        // Compare the entered password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, isExist.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({
                success: false,
                body: null,
                error: "Invalid email or password", // Generic message
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: isExist._id },               // Payload
            process.env.JWT_SECRET,            // Secret key
            { expiresIn: "30d" }               // Options
        );

        // Send the token in the response
        res.status(200).send({
            success: true,
            token,
            error: null,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: "Internal Server Error: " + error.message,
        });
    }
};

const post = async (req, res) => {
    console.log("ps")
    try {
        if (!isValidObjectId(req.user.id)) {
            return res.send("error")
        }

        let imagePaths = [];
        if (req.files && req.files.length > 0) {
            // Assuming images are stored under req.files
            imagePaths = req.files.map(file => file.path); // Save the file paths of uploaded images
        }

        const post = new Post({
            ...req.body,
            image: imagePaths
        })

        await post.save()

        res.status(201).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(200).send({
            success: false,
            body: null,
            error: "error" + error
        })
    }
}

const getAll = async (req, res) => {
    try {
        const post = await Post.find();

        res.status(200).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: error
        })
    }
}

const getById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: error
        })
    }
}
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        res.status(200).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: error
        })
    }
}

const contact = async (req, res) => {
    try {
        const post = new Contact(req.body)
        await post.save();
        res.status(200).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: error
        })
    }
}
const getAllContacts = async (req, res) => {
    try {
        const post = await Contact.find()

        res.status(200).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: error
        })
    }
}
const deleteContact = async (req, res) => {
    try {
        const post = await Contact.findByIdAndUpdate(req.params.id)

        res.status(200).send({
            success: true,
            body: post,
            error: null
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            body: null,
            error: error
        })
    }
}

module.exports = {
    signUp,
    login,
    post,
    getAll,
    getById,
    deletePost,
    contact,
    getAllContacts,
    deleteContact
}