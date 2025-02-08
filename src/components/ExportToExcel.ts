import ExcelJS, { Column } from 'exceljs'
import { saveAs } from 'file-saver'

interface Props {
    data: {
        forEach(arg0: (item: any) => void): unknown
        id: string
        customer_name: string
        contact_number: string
        product_name: string
        quantity: string
        total: string
        terms: string
        due_date: string
        created_at: string
    }
    headers: Partial<Column>[]
    filename: string
}

const exportToExcel = async ({ data, headers, filename }: Props) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    worksheet.columns = headers

    worksheet.getRow(1).height = 30

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { color: { argb: 'FFFFFFFF' } }
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4CAF50' },
        }
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
    })

    data.forEach(item => {
        const row = worksheet.addRow(item);
        row.eachCell((cell) => {
            cell.alignment = { horizontal: 'left', vertical: 'middle' };
        })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, filename)
};

export default exportToExcel
