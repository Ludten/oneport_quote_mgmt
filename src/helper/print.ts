export const handlePrint = () => {
  const printableContent = document.getElementById("preview-content");

  if (printableContent) {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @media print {
                body * {
                  visibility: hidden;
                }
                #printable-content, #printable-content * {
                  visibility: visible;
                }
                #printable-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 1025px;
                  height: auto;
                }
              }
            </style>
          </head>
          <body>
            <div id="printable-content">
              ${printableContent.innerHTML}
            </div>
            <script>
              window.print();
              window.close();
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
};
