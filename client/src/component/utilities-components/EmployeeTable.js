import React from "react";

const EmployeeTable = ({ employeeData }) => {
  return (
    <>
      {employeeData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-400">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">Designation Type</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr key={employee._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{employee.employeeName}</td>
                  <td className="border px-4 py-2">{employee.designation}</td>
                  <td className="border px-4 py-2">
                    {employee.designationType}
                  </td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5 p-4 bg-slate-200">
          <h1 className="uppercase font-bold">Sorry! Data not available!</h1>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
