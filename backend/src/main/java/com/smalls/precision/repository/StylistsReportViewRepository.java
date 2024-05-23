package com.smalls.precision.repository;

import com.smalls.precision.model.StylistsReportView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StylistsReportViewRepository extends CrudRepository<StylistsReportView, Integer> {
}
