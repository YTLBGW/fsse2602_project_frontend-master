import React, { useState, useContext } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LoginUserContext } from "../../context/LoginUserContext.tsx";
import { signOut } from "../../authService/FirebaseAuthService.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faBasketShopping,
  faVault,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const loginUser = useContext(LoginUserContext);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleLinkClick = (to: string) => {
    setIsOpen(false);
    void navigate({ to });
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={toggleDrawer}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "white",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Open Menu"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "300px",
          zIndex: 1200,
          backgroundColor: "rgba(15, 15, 26, 0.6)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "10px 0 30px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "40px 30px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "60px",
            }}
          >
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Menu
            </span>
            <button
              onClick={toggleDrawer}
              style={{
                border: "none",
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flexGrow: 1,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => handleLinkClick("/")}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.1rem",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "10px",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="https://asia.pokemon-card.com/tw/card-img/products/Back_of_card.png"
                  alt="TCG Icon"
                  style={{
                    width: "20px",
                    height: "28px",
                    objectFit: "contain",
                    borderRadius: "2px",
                  }}
                />
                <span>Pokémon TCG</span>
              </div>
            </button>

            <button
              onClick={() => handleLinkClick("/products")}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.1rem",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "10px",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <FontAwesomeIcon icon={faVault} />
                <span>Card Vault</span>
              </div>
            </button>

            <button
              onClick={() => handleLinkClick("/cart")}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.1rem",
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "10px",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <FontAwesomeIcon icon={faBasketShopping} />
                <span>Shopping Cart</span>
              </div>
            </button>
          </nav>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "30px",
              marginTop: "auto",
              textAlign: "center",
            }}
          >
            {loginUser ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {loginUser.email}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,100,100,0.4)",
                    color: "rgba(255,150,150,0.8)",
                    padding: "10px 20px",
                    borderRadius: "30px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "0.9rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,100,100,0.1)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255,150,150,0.8)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={toggleDrawer}
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    width: "100%",
                    background: "white",
                    border: "none",
                    color: "black",
                    padding: "12px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e0e0e0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
