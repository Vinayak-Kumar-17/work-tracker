package com.worktracker.controller;

import com.worktracker.model.WorkItem;
import com.worktracker.repository.WorkItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workitems")
public class WorkItemController {

    @Autowired
    private WorkItemRepository workItemRepository;

    @GetMapping
    public List<WorkItem> getAllWorkItems() {
        return workItemRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<WorkItem> createWorkItem(@RequestBody @NonNull WorkItem workItem) {
        WorkItem savedItem = workItemRepository.save(workItem);
        return new ResponseEntity<WorkItem>(savedItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkItem> updateWorkItem(@PathVariable @NonNull Long id,
            @RequestBody @NonNull WorkItem workItemDetails) {
        return workItemRepository.findById(id)
                .map((@NonNull WorkItem workItem) -> {
                    workItem.setTitle(workItemDetails.getTitle());
                    workItem.setDescription(workItemDetails.getDescription());
                    workItem.setStatus(workItemDetails.getStatus());
                    WorkItem updatedItem = workItemRepository.save(workItem);
                    return new ResponseEntity<WorkItem>(updatedItem, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<WorkItem>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkItem(@PathVariable @NonNull Long id) {
        return workItemRepository.findById(id)
                .map((@NonNull WorkItem workItem) -> {
                    workItemRepository.delete(workItem);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<Void>(HttpStatus.NOT_FOUND));
    }
}
