import React from 'react'
import { LogoWieldi } from '../../atoms'
import CollapButton from '../../atoms/CollapButton'

interface SidebarToggleProps {
  collapsed: boolean
  onToggle: () => void
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ collapsed, onToggle }) => (
  <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '48px' }}>
    <div className='flex gap-4 justify-center'>
      <CollapButton collapsed={collapsed} onToggle={onToggle} />
      <LogoWieldi />
    </div>
  </div>
)

export default SidebarToggle
