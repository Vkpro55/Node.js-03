const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/errors/app-errors");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        console.log("Response form CRUD: ", response);

        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id
            }
        });

        if (!response) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }
        return response;
    }


    async get(pk) {
        if (typeof (pk) === "string") {
            const response = await this.model.findOne({
                where: {
                    code: pk
                }
            });
            if (!response) {
                throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
            }
            return response;
        }
        else {
            const response = await this.model.findByPk(pk);
            if (!response) {
                throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
            }
            return response;
        }
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }


    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        });

        if ((Array.isArray(response) === true) && (response[0] === 0)) {
            throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
        }

        return response;
    }
};


module.exports = CrudRepository;