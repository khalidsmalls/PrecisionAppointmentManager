import { Client } from './Client'
import AppointmentView from './AppointmentView'
import AppointmentReportView from './AppointmentReportView'
import { StylistReportView } from './StylistReportView'

interface SortFunction<T> {
  (list: T[]): T[]
}

export interface ClientSorts {
  [key: string]: SortFunction<Client>
}

export interface AppointmentSorts {
  [key: string]: SortFunction<AppointmentView>
}

export interface AppointmentReportSorts {
  [key: string]: SortFunction<AppointmentReportView>
}

export interface StylistReportSorts {
  [key: string]: SortFunction<StylistReportView>
}
