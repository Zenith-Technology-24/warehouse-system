import React, { Suspense, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Loading from './components/Loading'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Login = React.lazy(() => import('./pages/Login'))
const Inventory = React.lazy(() => import('./pages/Inventory'))
const InventoryLayout = React.lazy(() => import('./pages/Inventory/layout'))
const Pagelayout = React.lazy(() => import('./components/Pagelayout'))
const RequireAuth = React.lazy(() => import('./helper/RequireAuth'))
const RequireSuperadmin = React.lazy(() => import('./helper/RequireSuperadmin'))
const NotAuth = React.lazy(() => import('./helper/NotAuth'))
const CreateProduct = React.lazy(() => import('./pages/Inventory/CreateProduct'))
const UpdateProduct = React.lazy(() => import('./pages/Inventory/UpdateProduct'))
const Sales = React.lazy(() => import('./pages/Sales'))
const CreateSales = React.lazy(() => import('./pages/Sales/Create'))
const UpdateSales = React.lazy(() => import('./pages/Sales/Update'))
const ViewSales = React.lazy(() => import('./pages/Sales/View'))
const Expenses = React.lazy(() => import('./pages/Expenses'))
const CreateExpense = React.lazy(() => import('./pages/Expenses/Create'))
const UpdateExpense = React.lazy(() => import('./pages/Expenses/Update'))
const Settings = React.lazy(() => import('./pages/Settings'))

const ManageUsers = React.lazy(() => import('./pages/ManageUsers'))
const CreateUser = React.lazy(() => import('./pages/ManageUsers/Create'))
const UpdateUser = React.lazy(() => import('./pages/ManageUsers/Update'))
const ViewUser = React.lazy(() => import('./pages/ManageUsers/View'))

const Issuance = React.lazy(() => import('./pages/Issuance'))
const CreateIssuance = React.lazy(() => import('./pages/Issuance/Create'))
const ViewIssuance = React.lazy(() => import('./pages/Issuance/View'))
const UpdateIssuance = React.lazy(() => import('./pages/Issuance/Update'))

const ReturnOfItems = React.lazy(() => import('./pages/ReturnOfItems'))
const CreateReturnOfItems = React.lazy(() => import('./pages/ReturnOfItems/Create'))
// const ViewReturnOfItems = React.lazy(() => import('./pages/ReturnOfItems/View'))
const UpdateReturnOfItems = React.lazy(() => import('./pages/ReturnOfItems/Update'))

const Receipt = React.lazy(() => import('./pages/Receipt'))
const CreateReceipt = React.lazy(() => import('./pages/Receipt/Create'))
const ViewReceipt = React.lazy(() => import('./pages/Receipt/View'))
const UpdateReceipt = React.lazy(() => import('./pages/Receipt/Update'))

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/serviceWorker.js")
          .then(registration => {
            // console.log("ServiceWorker registered: ", registration);
          })
          .catch(registrationError => {
            console.log("ServiceWorker registration failed: ", registrationError);
          });
      });
    }

  }, [])

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          style: {
            minWidth: '250px',
          },
        }}
      />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          <Route element={<NotAuth />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Pagelayout />} >
              <Route index={true} element={<Dashboard />} />
              <Route path="inventory" element={<InventoryLayout />} >
                <Route index={true} element={<Inventory />} />
                <Route path="create" element={<CreateProduct />} />
                <Route path="update" element={<UpdateProduct />} />
              </Route>
              <Route path="sales">
                <Route index={true} element={<Sales />} />
                <Route path="create" element={<CreateSales />} />
                <Route path="update" element={<UpdateSales />} />
                <Route path="view/:id" element={<ViewSales />} />
              </Route>
              <Route path="expenses">
                <Route index={true} element={<Expenses />} />
                <Route path="create" element={<CreateExpense />} />
                <Route path="update" element={<UpdateExpense />} />
              </Route>

              <Route path="issuance">
                <Route index={true} element={<Issuance />} />
                <Route path="create" element={<CreateIssuance />} />
                <Route path="view" element={<ViewIssuance />} />
                <Route path="update" element={<UpdateIssuance />} />
              </Route>

              <Route path="return-of-items">
                <Route index={true} element={<ReturnOfItems />} />
                <Route path="create" element={<CreateReturnOfItems />} />
                <Route path="update" element={<UpdateReturnOfItems />} />
              </Route>

              <Route path="receipt">
                <Route index={true} element={<Receipt />} />
                <Route path="create" element={<CreateReceipt />} />
                <Route path="view" element={<ViewReceipt />} />
                <Route path="update" element={<UpdateReceipt />} />
              </Route>

              <Route element={<RequireSuperadmin />}>
                <Route path="manage-users">
                  <Route index={true} element={<ManageUsers />} />
                  <Route path="create" element={<CreateUser />} />
                  <Route path="update" element={<UpdateUser />} />
                  <Route path="view" element={<ViewUser />} />
                </Route>
              </Route>
              <Route path="settings">
                <Route index={true} element={<Settings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
