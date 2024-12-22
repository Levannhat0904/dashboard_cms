import React from 'react'
import { LogoWieldi } from '../../atoms'
import CollapButton from '../../atoms/ACollapButton'

interface SidebarToggleProps {
  collapsed: boolean
  onToggle: () => void
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ collapsed, onToggle }) => (
  <div className='flex justify-center md:justify-start items-center px-4 h-12'>
    <div className='flex gap-4 justify-center content-center'>
      <div className='md:block hidden'>
        <CollapButton collapsed={collapsed} onToggle={onToggle} />
      </div>
      <LogoWieldi />
    </div>
  </div>
)

export default SidebarToggle
