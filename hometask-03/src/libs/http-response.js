module.exports = {
  errorResponse(res, code, data) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = code;

    return res.end(JSON.stringify(data));
  },
  successResponse(res, code, data) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = code;

    return res.end(JSON.stringify(data));
  }
}
