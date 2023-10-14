module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            username: String,
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            password: String,
            image: String,
            published: Boolean,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model('User', schema);
    return User;
};
