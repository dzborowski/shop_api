declare namespace Express {
    export interface Request {
        user: null | import("../src/user/UserEntity").UserEntity
    }
}
