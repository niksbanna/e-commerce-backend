export default (asyncErrHandler) => (req, res, next) => {
    Promise.resolve(asyncErrHandler(req, res, next)).catch(next);
}