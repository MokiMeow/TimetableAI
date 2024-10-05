import React, { createContext, useContext, useState } from 'react'

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const Tabs: React.FC<React.PropsWithChildren<{ defaultValue: string }>> = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="flex space-x-2 mb-4">{children}</div>
}

export const TabsTrigger: React.FC<React.PropsWithChildren<{ value: string }>> = ({ children, value }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context

  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<React.PropsWithChildren<{ value: string }>> = ({ children, value }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context

  if (value !== activeTab) return null
  return <div className="tab-content">{children}</div>
}