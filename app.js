const excelBtn = document.getElementById("excelBtn")
const pdfBtn = document.getElementById("pdfBtn")
let array = [
    { name: "ali omer", age: 60, course: "wma" },
    { name: "omer", age: 20, course: "cco" },
    { name: "saqib", age: 40, course: "ccna" },
    { name: "baber", age: 10, course: "wma" },
    { name: "ali khan", age: 15, course: "cco" },
    { name: "ali", age: 25, course: "cco" },

]
let filterItem = () => {
    return array.filter((value) => (value.age > 20 && value.name == "ali") || value.course == "wma")

}
excelBtn.addEventListener("click", () => {
    let newarr = filterItem()
    console.log(newarr)

    const excelData = newarr.map((student, index) => ({
        "S.NO": index + 1,
        "Student name ": student.name,
        "Age": student.age,
        "Course name": student.course
    }))

    const worksheet = XLSX.utils.json_to_sheet(excelData)
    worksheet["!cols"] = [
        { wch: 8 },
        { wch: 25 },
        { wch: 10 },
        { wch: 25 },


    ]
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, "Filter User")

    XLSX.writeFile(workbook, "students.xlsx")
})

pdfBtn.addEventListener("click", () => {
    let newarr = filterItem()

    const { jsPDF } = window.jspdf
    let pdf = new jsPDF()

    pdf.setFontSize(16);
    pdf.text("filtered Student Record", 14, 15)

    const head = ["S.NO", "Student Name", "Age ", "Course"]
    const body = newarr.map((val, i) => [
        i+1,
        val.name, 
        val.age,
        val.course
    ])

    pdf.autoTable({
        head: [head],
        body: body,
        startY: 50,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, // Blue Header
        styles: { fontSize: 10, cellPadding: 3 }
    })
    pdf.save("student.pdf")
})