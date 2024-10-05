'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Download, GraduationCap, Clock, Calendar, Coffee, Utensils, Users, BookOpen, School } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { TimePicker } from "@/components/ui/time-picker"
import { signOut } from 'next-auth/react'; // Import signOut

const popularDepartments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Business Administration', 'Psychology']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

interface Subject {
  code: string;
  name: string;
  faculty: string;
}

interface Section {
  name: string;
  students: number;
}

interface Break {
  name: string;
  startTime: string;
  endTime: string;
}

interface Errors {
  department?: string;
  subjects?: string;
  totalStudents?: string;
  sections?: string;
}

interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  faculty: string;
  type: 'class' | 'lab' | 'break';
}

interface GeneratedTimetables {
  [key: string]: TimetableEntry[];
}

const GeneratePage: React.FC = () => {
  const [instituteName, setInstituteName] = useState('BMS Institute of Technology & Management')
  const [department, setDepartment] = useState('Department of Computer Science and Engineering')
  const [semester, setSemester] = useState('V')
  const [academicYear, setAcademicYear] = useState('2024-2025')
  const [subjects, setSubjects] = useState<Subject[]>([{ code: '', name: '', faculty: '' }])
  const [totalStudents, setTotalStudents] = useState(0)
  const [sections, setSections] = useState<Section[]>([{ name: 'A', students: 0 }])
  const [breaks, setBreaks] = useState<Break[]>([
    { name: 'Tea Break', startTime: '10:30', endTime: '10:50' },
    { name: 'Lunch Break', startTime: '12:50', endTime: '13:45' }
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTimetables, setGeneratedTimetables] = useState<GeneratedTimetables | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [preferences, setPreferences] = useState({
    prioritizeFaculty: false,
    avoidEarlyMornings: false,
    maximizeBreaks: false
  })

  const validateForm = () => {
    const newErrors: Errors = {}
    if (!department) newErrors.department = 'Department is required'
    if (subjects.some(s => !s.code || !s.name || !s.faculty)) {
      newErrors.subjects = 'All subject fields are required'
    }
    if (totalStudents <= 0) newErrors.totalStudents = 'Number of students must be greater than 0'
    if (sections.reduce((sum, s) => sum + s.students, 0) !== totalStudents) {
      newErrors.sections = 'Total students in sections must match the total number of students'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects]
    newSubjects[index][field] = value
    setSubjects(newSubjects)
  }

  const addSubject = () => {
    setSubjects([...subjects, { code: '', name: '', faculty: '' }])
  }

  const removeSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index)
    setSubjects(newSubjects)
  }

  const handleSectionChange = (index: number, field: keyof Section, value: string | number) => {
    const newSections = [...sections]
    if (field === 'students') {
      newSections[index][field] = Number(value)
    } else {
      newSections[index][field] = value as string
    }
    setSections(newSections)
  }

  const addSection = () => {
    const nextSectionName = String.fromCharCode(sections[sections.length - 1].name.charCodeAt(0) + 1)
    setSections([...sections, { name: nextSectionName, students: 0 }])
  }

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    setSections(newSections)
  }

  const handleBreakChange = (index: number, field: keyof Break, value: string) => {
    const newBreaks = [...breaks]
    newBreaks[index][field] = value
    setBreaks(newBreaks)
  }

  const addBreak = () => {
    setBreaks([...breaks, { name: '', startTime: '', endTime: '' }])
  }

  const removeBreak = (index: number) => {
    const newBreaks = breaks.filter((_, i) => i !== index)
    setBreaks(newBreaks)
  }

  const generateTimetables = async () => {
    if (!validateForm()) return

    setIsGenerating(true)
    const newTimetable: GeneratedTimetables = {}

    sections.forEach(section => {
      newTimetable[section.name] = []

      days.forEach((day: string) => {
        let currentTime = '08:30' // Start time

        while (currentTime < '16:30') { // End time
          const entry: TimetableEntry = {
            day,
            time: currentTime,
            subject: '',
            faculty: '',
            type: 'class'
          }

          // Check for breaks
          const breakTime = breaks.find(b => b.startTime === currentTime)
          if (breakTime) {
            entry.subject = breakTime.name
            entry.type = 'break'
            currentTime = breakTime.endTime
          } else {
            // Assign a random subject
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]
            entry.subject = randomSubject.name
            entry.faculty = randomSubject.faculty

            // Apply preferences
            if (preferences.avoidEarlyMornings && currentTime < '10:00') {
              entry.subject = 'Free'
              entry.faculty = ''
            }

            // Move to next time slot
            const [hours, minutes] = currentTime.split(':').map(Number)
            const nextTime = new Date(2000, 0, 1, hours, minutes + 50)
            currentTime = nextTime.toTimeString().slice(0, 5)
          }

          newTimetable[section.name].push(entry)
        }
      })
    })

    setGeneratedTimetables(newTimetable)
    setIsGenerating(false)
  }

  const downloadTimetable = (section: string) => {
    if (!generatedTimetables) return

    let csv = 'Day,Time,Subject,Faculty\n'
    generatedTimetables[section].forEach(entry => {
      csv += `${entry.day},${entry.time},${entry.subject},${entry.faculty}\n`
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `timetable_${section}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'lab':
        return 'bg-blue-100 dark:bg-blue-800'
      case 'break':
        return 'bg-green-100 dark:bg-green-800'
      default:
        return 'bg-white dark:bg-gray-700'
    }
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Redirect to the landing page after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <School className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
              <h1 className="ml-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">TimetableGen</h1>
            </div>
            <nav className="flex space-x-4">
              <Button onClick={handleLogout} className="text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
            AI Timetable Generator
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8">
            Create optimal schedules with our advanced AI algorithm
          </p>
        </motion.div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Institute Information</CardTitle>
            <CardDescription>Enter your institute details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="instituteName">Institute Name</Label>
                <Input
                  id="instituteName"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="totalStudents">Total Students</Label>
                <Input
                  id="totalStudents"
                  type="number"
                  value={totalStudents}
                  onChange={(e) => setTotalStudents(Number(e.target.value))}
                />
                {errors.totalStudents && <p className="text-red-500 text-sm mt-1">{errors.totalStudents}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Timetable Configuration</CardTitle>
            <CardDescription>Set up your subjects, sections, and breaks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="subjects">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="breaks">Breaks</TabsTrigger>
              </TabsList>
              <TabsContent value="subjects">
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
                    >
                      <Input
                        placeholder="Subject Code"
                        value={subject.code}
                        onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Subject Name"
                        value={subject.name}
                        onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Faculty Name"
                        value={subject.faculty}
                        onChange={(e) => handleSubjectChange(index, 'faculty', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeSubject(index)}
                        className="mt-2 sm:mt-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <Button onClick={addSubject}>
                    <Plus className="h-4 w-4 mr-2" /> Add Subject
                  </Button>
                  {errors.subjects && <p className="text-red-500 text-sm mt-1">{errors.subjects}</p>}
                </div>
              </TabsContent>
              <TabsContent value="sections">
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
                    >
                      <Input
                        placeholder="Section Name"
                        value={section.name}
                        onChange={(e) => handleSectionChange(index, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Number of Students"
                        value={section.students}
                        onChange={(e) => handleSectionChange(index, 'students', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeSection(index)}
                        className="mt-2 sm:mt-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <Button onClick={addSection}>
                    <Plus className="h-4 w-4 mr-2" /> Add Section
                  </Button>
                  {errors.sections && <p className="text-red-500 text-sm mt-1">{errors.sections}</p>}
                </div>
              </TabsContent>
              <TabsContent value="breaks">
                <div className="space-y-4">
                  {breaks.map((breakItem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
                    >
                      <Input
                        placeholder="Break Name"
                        value={breakItem.name}
                        onChange={(e) => handleBreakChange(index, 'name', e.target.value)}
                        className="flex-1"
                      />
                      <TimePicker
                        placeholder="Start Time"
                        value={breakItem.startTime}
                        onChange={(value) => handleBreakChange(index, 'startTime', value)}
                        className="flex-1"
                      />
                      <TimePicker
                        placeholder="End Time"
                        value={breakItem.endTime}
                        onChange={(value) => handleBreakChange(index, 'endTime', value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeBreak(index)}
                        className="mt-2 sm:mt-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <Button onClick={addBreak}>
                    <Plus className="h-4 w-4 mr-2" /> Add Break
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your timetable generation preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="prioritizeFaculty" className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm sm:text-base">Prioritize Faculty Availability</span>
                </Label>
                <Switch
                  id="prioritizeFaculty"
                  checked={preferences.prioritizeFaculty}
                  onCheckedChange={(checked) => setPreferences({...preferences, prioritizeFaculty: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="avoidEarlyMornings" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm sm:text-base">Avoid Early Morning Classes</span>
                </Label>
                <Switch
                  id="avoidEarlyMornings"
                  checked={preferences.avoidEarlyMornings}
                  onCheckedChange={(checked) => setPreferences({...preferences, avoidEarlyMornings: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="maximizeBreaks" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm sm:text-base">Maximize Breaks Between Classes</span>
                </Label>
                <Switch
                  id="maximizeBreaks"
                  checked={preferences.maximizeBreaks}
                  onCheckedChange={(checked) => setPreferences({...preferences, maximizeBreaks: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <Button
            onClick={generateTimetables}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <motion.div
                  className="animate-spin mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ◌
                </motion.div>
                Generating Timetables...
              </>
            ) : (
              <>Generate Timetables</>
            )}
          </Button>
        </div>

        {generatedTimetables && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4">Generated Timetables</h2>
            {Object.entries(generatedTimetables).map(([section, timetable]) => (
              <Card key={section} className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{instituteName}</CardTitle>
                  <CardDescription>{department}</CardDescription>
                  <CardDescription>{semester} SEMESTER B.E. TIMETABLE FOR THE ACADEMIC YEAR {academicYear}</CardDescription>
                  <CardDescription>Section: {section}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                          {days.map((day: string) => (
                            <th key={day} className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {Array.from(new Set(timetable.map(entry => entry.time))).map(time => (
                          <tr key={time}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{time}</td>
                            {days.map((day: string) => {
                              const entry = timetable.find(e => e.day === day && e.time === time)
                              return (
                                <td key={`${day}-${time}`} className={`px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 ${entry?.type === 'break' ? 'bg-green-100 dark:bg-green-800' : ''}`}>
                                  {entry ? (
                                    <>
                                      <div className="font-medium">{entry.subject}</div>
                                      <div className="text-xs text-gray-500">{entry.faculty}</div>
                                    </>
                                  ) : 'Free'}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button className="mt-4" onClick={() => downloadTimetable(section)}>
                    <Download className="h-4 w-4 mr-2" /> Download Timetable
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-lg py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <School className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">TimetableGen</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GeneratePage;