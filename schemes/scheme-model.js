const db = require("../data/config");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove,
    update
};

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .first();
}

function findSteps(scheme_id) {
    return db("schemes as sc")
        .join("steps as st", "st.scheme_id", "sc.id")
        .select(
            "st.id",
            "st.step_number",
            "sc.scheme_name",
            "st.instructions",
            "st.scheme_id"
        )
        .where("scheme_id", scheme_id)
        .orderBy("st.step_number");
}

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then(([id]) => {
            return findById(id);
        });
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("schemes")
        .where("id", id)
        .del();
}

