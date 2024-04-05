import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', 
    currentProduct: null,
    currentCategory: null,
    currentProductMethod: '',
    currentCategoryMethod: '',
    currentTab: null,
    currentTable: null,
    nav: false,

    showAddMenu: () => {},
    hideAddMenu: () => {},
    showAddCategory: () => {},
    hideAddCategory: () => {},
    showAddProduct: () => {},
    hideAddProduct: () => {},
    setCurrentProduct: () => {},
    clearCuurrentProduct: () => {},
    showAddMap: () => {},
    hideAddMap: () => {},
    showOrdersModal: () => {},
    hideOrdersModal: () => {},

    setCurrentCategory: () => {},
    setCurrentProductMethod: () => {},
    setCurrentCategoryMethod: () => {},

    setCurrentTab: () => {},
    setCurrentTable: () => {},

    setShowMainNav: () => {},
})

export function UserProgressContextProvider({children}) {

    const [userProgress, setUserProgress] = useState('');
    const [product, setProduct] = useState(null)
    const [currentCategory, setCategory] = useState(null)
    const [currentProductMethod, setCurrentMethod] = useState(null)
    const [currentCategoryMethod, setCategoryMethod] = useState(null)
    const [currentTab, setTab] = useState(null)
    const [nav, showNav] = useState(false)
    const [currentTable, setCurrentTable] = useState(null)

    const showAddMenu = () => {
        setUserProgress('menu')
    }

    function hideAddMenu(){
        setUserProgress('')
    }

    function showAddCategory(){
        setUserProgress('category')
    }

    function hideAddCategory(){
        setUserProgress('')
    }

    function showAddProduct(){
        setUserProgress('product')
    }

    function hideAddProduct(){
        setUserProgress('')
    }

    function setCurrentProduct(product){
        setProduct(product)
    }

    function clearCuurrentProduct(){
        setProduct(null)
    }

    function setCurrentProductMethod(method){
        setCurrentMethod(method)
    }

    function setCurrentCategoryMethod(method){
        setCategoryMethod(method)
    }

    function setCurrentCategory(category){
        setCategory(category)
    }

    function showAddMap(){
        setUserProgress('map')
    }

    function hideAddMap(){
        setUserProgress('')
    }

    function setCurrentTab(tab){
        setTab(tab)
    }
    
    function setShowMainNav(value){
        showNav(value)
    }

    function showOrdersModal(){
        setUserProgress('orders')
    }

    function hideOrdersModal(){
        setUserProgress('')
    }

    function setTable(table){
        setCurrentTable(table)
    }

    const userProgressCtx = {
        progress: userProgress,
        currentProduct: product,
        currentProductMethod: currentProductMethod,
        currentCategoryMethod: currentCategoryMethod,
        currentCategory: currentCategory,
        currentTab: currentTab,
        currentTable: currentTable,
        nav: nav,

        showAddMenu: showAddMenu,
        hideAddMenu: hideAddMenu,
        showAddCategory: showAddCategory,
        hideAddCategory: hideAddCategory,
        showAddProduct: showAddProduct,
        hideAddProduct: hideAddProduct,
        setCurrentProduct: setCurrentProduct,
        clearCuurrentProduct: clearCuurrentProduct,
        setCurrentProductMethod: setCurrentProductMethod,
        setCurrentCategoryMethod: setCurrentCategoryMethod,
        setCurrentCategory: setCurrentCategory,
        showAddMap: showAddMap,
        hideAddMap: hideAddMap,
        showOrdersModal: showOrdersModal,
        hideOrdersModal: hideOrdersModal,
        setCurrentTable: setTable,

        setCurrentTab: setCurrentTab,
        setShowMainNav: setShowMainNav,
        
    }

    return (<UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>)

}

export default UserProgressContext;
