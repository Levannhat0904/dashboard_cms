import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavLinkMenuItemProps {
  path: string
  label: string
  isActive: boolean
}

const NavLinkMenuItem: React.FC<NavLinkMenuItemProps> = ({ path, label, isActive }) => (
  <NavLink
    to={path}
    end
    className={
      isActive ? '!text-red-500 !no-underline custom-class' : 'text-[#038fde] !no-underline group-hover:!text-red-500'
    }
  >
    {label}
  </NavLink>
)

export default NavLinkMenuItem
