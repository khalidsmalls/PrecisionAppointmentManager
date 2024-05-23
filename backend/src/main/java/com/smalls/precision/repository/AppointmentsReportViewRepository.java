package com.smalls.precision.repository;

import com.smalls.precision.model.AppointmentsReportView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentsReportViewRepository extends CrudRepository<AppointmentsReportView, Integer> {
}
