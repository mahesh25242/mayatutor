<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    private $pagination;

    public function __construct($resource)
    {
        $this->pagination = [
            'total' => $resource->total(),
            'count' => $resource->count(),
            'per_page' => $resource->perPage(),
            'current_page' => $resource->currentPage(),
            'total_pages' => $resource->lastPage(),
            'prev_page_url'  => $resource->previousPageUrl(),
            'next_page_url'  => $resource->nextPageUrl(),

        ];

        //$resource = $resource->getCollection();

        parent::__construct($resource);
    }


    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->resource;

        // return array_merge([
        //     'data' => $this->resource,
        // ], $this->pagination);
    }
}
