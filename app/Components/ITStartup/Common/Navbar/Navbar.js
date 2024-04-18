"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import MenuItem from "./MenuItem"
import { menus } from "./menus"
// import SidebarModal from "../SidebarModal/SidebarModal"

const Navbar = () => {
  // Sidebar Modal
  const [sidebarModal, setSidebarModal] = useState(false)
  const toggleModal = () => {
    setSidebarModal(!sidebarModal)
  }

  // Search Form
  const [searchForm, setSearchForm] = useState(false)
  const handleSearchForm = () => {
    setSearchForm(prevState => !prevState)
  }

  // Navbar
  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    const handleScroll = () => {
      const elementId = document.getElementById("navbar")
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky")
      } else {
        elementId?.classList.remove("is-sticky")
      }
    }
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show"
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right"

  return (
    <>
      <div id="navbar" className="navbar-area">
        <div className="main-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link href="/" className="navbar-brand">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={124}
                  height={38}
                />
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav">
                  {menus.map(menuItem => (
                    <MenuItem key={menuItem.label} {...menuItem} />
                  ))}
                </ul>
              </div>

              <div className="others-options">
                <div className="cart-items">
                  <Link href="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    <span>{5}</span>
                  </Link>
                </div>

                <div className="option-item">
                  <i
                    onClick={handleSearchForm}
                    className="search-btn flaticon-search"
                    style={{
                      display: searchForm ? "none" : "block"
                    }}
                  ></i>

                  <i
                    onClick={handleSearchForm}
                    className={`close-btn flaticon-close ${
                      searchForm ? "active" : ""
                    }`}
                  ></i>

                  <div
                    className="search-overlay search-popup"
                    style={{
                      display: searchForm ? "block" : "none"
                    }}
                  >
                    <div className="search-box">
                      <form className="search-form">
                        <input
                          className="search-input"
                          name="search"
                          placeholder="Search"
                          type="text"
                        />
                        <button className="search-button" type="submit">
                          <i className="fas fa-search"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="burger-menu" onClick={toggleModal}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Right Sidebar Modal */}
      {/* <SidebarModal
        onClick={toggleModal}
        active={sidebarModal ? "active" : ""}
      /> */}
    </>
  )
}

export default Navbar
