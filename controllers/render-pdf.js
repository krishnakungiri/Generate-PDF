async function renderPDF(req, res) {
  try {
    return res.render("propertyPdf");
  } catch (error) {
    throw error;
  }
}

module.exports = renderPDF;
