package com.HaiDang.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String title;
    String description;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id")
    Category category;
    LocalDateTime createdAt;
    double price;
    double discountedPrice;
    double discountPresent;
    int quantity;
    String brand;
    String color;
    String imageUrl;
    @Embedded
    @ElementCollection
    @CollectionTable(name = "Size")
    Set<Size> size = new HashSet<>();
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Rating> ratings = new ArrayList<>();
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Review> reviews = new ArrayList<>();
    int numRatings;
}
