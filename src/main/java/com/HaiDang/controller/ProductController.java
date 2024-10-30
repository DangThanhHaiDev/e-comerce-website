package com.HaiDang.controller;

import com.HaiDang.exception.ProductException;
import com.HaiDang.model.Product;
import com.HaiDang.model.Size;
import com.HaiDang.request.ProductRequest;
import com.HaiDang.response.ProductResponse;
import com.HaiDang.service.ProductService;
import com.HaiDang.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController{
    @Autowired
    ProductService productService;
    @GetMapping("/products")
    public ResponseEntity<PagedModel<Product>> getProductByFilter(@RequestParam(required = false) String category, @RequestParam(required = false) List<String> color, @RequestParam(required = false) List<String> size,
                                                            @RequestParam(required = false) Double minPrice, @RequestParam(required = false) Double maxPrice, @RequestParam(required = false) Double minDiscount,
                                                            @RequestParam(required = false) String sort, @RequestParam(required = false) String stock, @RequestParam Integer pageNumber, @RequestParam Integer pageSize){
        PagedModel<Product> products = productService.getAllProductsByFilter(category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
        return new ResponseEntity<PagedModel<Product>>(products, HttpStatus.ACCEPTED);
    }

    @GetMapping("/products/id/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) throws ProductException {
        Product product = productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.ACCEPTED);
    }
}
